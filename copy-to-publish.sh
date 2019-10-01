#!/bin/bash
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PUBLISH_DIR="$CURRENT_DIR/.publish"
rm -rf $PUBLISH_DIR/*

for workspaces in $(yarn workspaces info  | grep location  | awk -F: '{ print $2 }' | sed 's/[",]//g')
do

PROJECT_NAME=`basename $CURRENT_DIR/$workspaces`
PUBLISH_PROJECT_DIR="$CURRENT_DIR/.publish/$PROJECT_NAME"
SOURCE_PROJECT_DIR="$CURRENT_DIR/$workspaces/.publish"

if [[ -e $SOURCE_PROJECT_DIR ]]; then

  if [[ ! -e $PUBLISH_PROJECT_DIR ]]; then
    mkdir -p $PUBLISH_PROJECT_DIR
  fi

  rm -rf $PUBLISH_PROJECT_DIR/*
  cp -rT $SOURCE_PROJECT_DIR/ $PUBLISH_PROJECT_DIR/
  rm -rf $SOURCE_PROJECT_DIR

fi

done