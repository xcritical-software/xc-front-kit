#!/bin/bash
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PUBLISH_DIR="$CURRENT_DIR/.publish"
rm -rf $PUBLISH_DIR/*

for workspaces in $(yarn boltify ws --json --since HEAD~1 | grep location  | awk -F: '{ print $2 }' | sed 's/[",]//g')
do

PROJECT_NAME=`basename $workspaces`
PUBLISH_PROJECT_DIR="$CURRENT_DIR/.publish/$PROJECT_NAME"
SOURCE_PROJECT_DIR="$workspaces"
echo $PROJECT_NAME;
if [[ -e "$SOURCE_PROJECT_DIR/dist" ]]; then

  if [[ ! -e $PUBLISH_PROJECT_DIR ]]; then
    mkdir -p $PUBLISH_PROJECT_DIR
  fi

  rm -rf $PUBLISH_PROJECT_DIR/*
  cp -rT $SOURCE_PROJECT_DIR/ $PUBLISH_PROJECT_DIR/

fi

done