#/bin/bash

JSON="object.json"
RUN=1
ARRAY=( 'object.json.1' 'object.json.2' 'object.json.3' 'object.json.4' )
# get number of elements in the array
ELEMENTS=${#ARRAY[@]}
SLEEP=10

let count=0

while [ $RUN ]
do
  # echo each element in array 
  # for loop
    for (( i=0;i<$ELEMENTS;i++)); do
      FILE=${ARRAY[${i}]}
      #echo $FILE;
      # mv $FILE to $JSON
      `cp $FILE ../map/$JSON`
      echo `cat $JSON`
      sleep $SLEEP
      `clear`
    done 
    ((count++))
    #echo "---";

done                      # Various other methods also work.


