#!/bin/bash

list_services=$(find -maxdepth 1 -type d | grep -E 'Service.*|WebPortal|ApiGateway' | awk -F/ '{print $2}')
list_changed_services=()

for service in ${list_services[@]}; do
    list_changed_services+="$(git diff HEAD~ --name-only | grep -Po ${service} | uniq) "
done

echo $list_changed_services
