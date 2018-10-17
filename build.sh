#!/bin/sh

rm -rf dist


if [ -z "$1" ]
  then
    echo "Needs version parameter"
    exit 1
fi

npm run build

if [ $? != 0 ]
    then
        echo "Error running npm run build."
        exit $?
fi

aws s3 sync dist/ "s3://admin-console-websites/citrusjs/$1/"

