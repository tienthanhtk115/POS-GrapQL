def listSuccessImage = []
def listFailImage = []
def listChangeServices = []
def chatID = "-1001547311638"
def printAll(list) {
	def returnString = ""
	list.each { item ->
		returnString = returnString + "\n" + "\t" + "-" + item
	}
	return returnString
}

pipeline {
	agent any
	environment {
		dockerRepo = "smartgapjsc"
		project = "posinventory"
		dockerTag = ""
		dockerImage = ""
	}

	options {
		gitLabConnection('Gitlab server connection')
	}

	parameters {
		booleanParam(name: 'BUILD_ALL', defaultValue: false, description: 'Choose to build all microservices')
	}

	stages {
		stage('Initialization') {
			steps {
				script {
					dockerTag = "${env.GIT_COMMIT.substring(0,8)}-${env.BRANCH_NAME}"
					currentBuild.displayName = "Tag: $dockerTag"
					sh (returnStdout: true, script: "bash find_changed_services.sh").trim().split(" ").each { changedService ->
						if (changedService != "") {
							listChangeServices.add(changedService)
						}
					}
				}
			}
		}

		stage('Configure'){
			steps {
				//Docker Login
				withCredentials([usernamePassword(credentialsId: 'DockerHub_Account', usernameVariable: 'dockerHubAccount', passwordVariable: 'dockerHubPassword')]) {
					sh "docker login --username $dockerHubAccount --password $dockerHubPassword"
				}
			}
			
		}

		//stage('Unit Test') {
		//	steps {
		//
		//	}
		//}

		stage('Build Image') {
			steps {
				script {
					//Define docker image name and tag
					if (params.BUILD_ALL == true) {
						listChangeServices=[]
						sh (returnStdout: true, script: "find -maxdepth 1 -type d | grep -P 'Service.*|WebPortal|ApiGateway' | awk -F/ '{print \$2}' | sed ':a;N;\$!ba;s/\\n/ /g'").trim().split(" ").each { service ->
							listChangeServices.add(service)
						}
					}
					if (listChangeServices.size() != 0) {
						listChangeServices.each { serviceName ->
							try {
								dockerImage = "$dockerRepo/${project}-${serviceName.toLowerCase().replaceAll("\\.","-").replaceAll("services","service")}:$dockerTag"
								echo "Building image for $serviceName ..."
								sh """
									docker build -t $dockerImage $serviceName
								"""
								listSuccessImage.add(dockerImage)
							} catch ( Exception e) {
								echo "Exception: $e"
								listFailImage.add(dockerImage)
								updateGitlabCommitStatus name: "Build", state: "failed"
							}
						}
					}
					updateGitlabCommitStatus name: "Build", state: "success"
				}
			}
		}

		stage('Publish') {
			when {
				branch pattern: "^develop\$", comparator: "REGEXP"
			}
			steps {
				gitlabCommitStatus("Publish") {
					script {
						if (listSuccessImage.size() == 0) {
							echo "Do not have success image to publish"
						} else {
							listSuccessImage.each { image ->
								sh "docker push $image"
							}
						}
					}
				}
			}
		}

		stage('Result') {
			steps {
				script {
					echo "List Fail"
					listFailImage.each { image ->
						echo "$image"
					}
					echo "List success"
					listSuccessImage.each { image ->
						echo "$image"
					}
				}
			}
		}

		stage('Deploy') {
			when {
				branch pattern: "^develop\$", comparator: "REGEXP"
			}
			steps {
				gitlabCommitStatus("Deploy") {
					script {
						if (listSuccessImage.size() == 0) {
							echo "None success image or having failed image"
						} else {
							withCredentials([sshUserPrivateKey(credentialsId: 'devops-ssh-key', keyFileVariable: 'identity', passphraseVariable: 'passphrase', usernameVariable: 'userName')]) {
								sh """
									sshpass -P "passphrase" -p '${passphrase}' \
									scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -P 26266 ${userName}@192.168.0.21:~/workspace/pos/docker-compose.yaml docker-compose-server.yaml
									yq eval-all '. as \$item ireduce ({}; . * \$item )' docker-compose.yaml docker-compose-server.yaml > docker-compose-merge.yaml
								"""
								listSuccessImage.each { image ->
									sh """
										sed -i 's/${image.split(":")[0].replaceAll("/","\\\\/")}:.*/${image.replaceAll("/","\\\\/")}/g' docker-compose-merge.yaml
									"""
								}
								sh """
									sshpass -P "passphrase" -p '${passphrase}' \
									scp -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -P 26266 docker-compose-merge.yaml ${userName}@192.168.0.21:~/workspace/pos/docker-compose.yaml
									
									sshpass -P "passphrase" -p '${passphrase}' \
									ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -p 26266 ${userName}@192.168.0.21 'docker-compose -f ~/workspace/pos/docker-compose.yaml up -d'
								"""
							}
						}
					}
				}
			}
		}
	}

	post { 
        always {
			script {
				withCredentials([string(credentialsId: 'jenkins-telegram-bot', variable: 'botToken')]) {
					listSuccess = printAll(listSuccessImage)
					listFailed = printAll(listFailImage)
					message = "URL: ${env.BUILD_URL}\nBuild ${env.GIT_COMMIT.substring(0,8)}-${env.BRANCH_NAME}\nBuildPass: $listSuccess\nBuildFailed: $listFailed\nBuild Status: ${currentBuild.currentResult}".replace("192.168.99.84","103.121.91.79").trim()
					echo(message)
					sh "curl -X POST 'https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatID\\&text=${URLEncoder.encode(message)}'"
				}
				echo "Clean Up environment"
				listSuccessImage.each { image ->
					sh "docker rmi $image --force"
				}
				sh """
					# Remove unused container
					docker container prune --force
					# Remove unused image
					docker images | grep '<none>' || true
					docker image prune --force
				"""
			}
        }
    }
}
