#!/bin/bash


publish()
{
  if [[ -e '.publish' ]]; then
    for dirname in $(echo ./.publish/*)
    do    
      (cd $dirname; npm version $version)
      npm publish $dirname --access public
    done
  fi
}

usage()
{
    echo "usage: publish.sh [[-v version ] | [-h]]"
}

##### Main
version=;

while [ -n "$1" ]; do
  case $1 in
      -v | --version )        shift
                              version=$1
                              ;;
      -h | --help )           usage
                              exit
                              ;;
      * )                     usage
                              exit 1
  esac
  shift
done
publish