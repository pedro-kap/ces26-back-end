if [ ! "$(sudo docker ps -a | grep ces26back)" ]
then
   sudo docker run --name ces26back -p 27017:27017 -d mongo
else
   sudo docker container start MongoDBCASD
fi

