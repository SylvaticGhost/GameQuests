PRIVATE_KEY_PEM=$(jq -r '.resources[] | select(.type == "tls_private_key") | .instances[0].attributes.private_key_pem' ./terraform.tfstate)

echo -e "$PRIVATE_KEY_PEM" > h.pem

chmod 600 h.pem

echo "Private key written to h.pem"
