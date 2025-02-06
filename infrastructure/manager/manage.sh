if [ -f .env ]; then
  export $(cat .env | xargs)
fi

start_instance() {
  aws ec2 start-instances --instance-ids $INSTANCE_ID
  echo "Starting instance $INSTANCE_ID"

  aws ec2 wait instance-running --instance-ids $INSTANCE_ID

  INSTANCE_IP=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID --query 'Reservations[0].Instances[0].PublicIpAddress' --output text)

  ssh -i ../h.pem ec2-user@$INSTANCE_IP << EOF
    sudo docker swarm init --advertise-addr $INSTANCE_IP
EOF
}

stop_instance() {
  aws ec2 stop-instances --instance-ids $INSTANCE_ID
  echo "Stopping instance $INSTANCE_ID"
}

case $1 in
  start)
    start_instance
    ;;
  stop)
    stop_instance
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
