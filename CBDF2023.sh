#! /bin/bash

#Download Source to get config
git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity /usr/local/src/ModSecurity/
cd /usr/local/src/ModSecurity/
#Install Modsecurity
sudo apt update
sudo apt -y install libmodsecurity3


#download modsecurity_module.so<build ModSecurity Nginx Connector module from home>
mkdir /etc/nginx/modules/
wget http://x.x.x.x/ngx_http_modsecurity_module.so
sudo cp ngx_http_modsecurity_module.so /etc/nginx/modules/

#Enable ModSecurity in nginx.conf
sed -i '1i\load_module /etc/nginx/modules/ngx_http_modsecurity_module.so;' /etc/nginx/nginx.conf
sed -i '/http {/a \    modsecurity on;\n    modsecurity_rules_file /etc/nginx/modsec/modsec-config.conf;' /etc/nginx/nginx.conf

#Create Directory and Files for ModSecurity 3 and config
sudo mkdir /var/log/modsec/
sudo chmod 777 /var/log/modsec/
sudo mkdir /etc/nginx/modsec/
sudo cp /usr/local/src/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsec/modsecurity.conf
sed -i 's/SecRuleEngine DetectionOnly/SecRuleEngine On/' /etc/nginx/modsec/modsecurity.conf
sed -i 's/SecAuditLogParts ABIJDEFHZ/SecAuditLogParts ABCEFHJKZ/' /etc/nginx/modsec/modsecurity.conf
sed -i 's/SecAuditEngine RelevantOnly/SecAuditEngine On/' /etc/nginx/modsec/modsecurity.conf
sed -i 's/SecAuditLogType Serial/#SecAuditLogType Serial/' /etc/nginx/modsec/modsecurity.conf
sed -i 's#^SecAuditLog /var/log/modsec_audit.log#SecAuditLogFormat JSON\nSecAuditLogType Concurrent\nSecAuditLogStorageDir /var/log/modsec/\nSecAuditLogFileMode 0777\nSecAuditLogDirMode 0777#' /etc/nginx/modsec/modsecurity.conf

#Create modsec-config.conf File
echo "Include /etc/nginx/modsec/modsecurity.conf" > /etc/nginx/modsec/modsec-config.conf
sudo cp /usr/local/src/ModSecurity/unicode.mapping /etc/nginx/modsec/

#Install OWASP Core Rule Set for ModSecurity 3
cd /etc/nginx/modsec
wget https://github.com/coreruleset/coreruleset/archive/refs/tags/nightly.tar.gz
tar -xvf nightly.tar.gz
sudo cp /etc/nginx/modsec/coreruleset-nightly/crs-setup.conf.example /etc/nginx/modsec/coreruleset-nightly/crs-setup.conf
echo "Include /etc/nginx/modsec/coreruleset-nightly/crs-setup.conf" >> /etc/nginx/modsec/modsec-config.conf
echo "Include /etc/nginx/modsec/coreruleset-nightly/rules/*.conf" >> /etc/nginx/modsec/modsec-config.conf


#download splunk enterprise
wget -O splunkforwarder-9.0.4-de405f4a7979-linux-2.6-amd64.deb "https://download.splunk.com/products/universalforwarder/releases/9.0.4/linux/splunkforwarder-9.0.4-de405f4a7979-linux-2.6-amd64.deb"
dpkg -i splunkforwarder-9.0.4-de405f4a7979-linux-2.6-amd64.deb

echo "[monitor:///var/log/modsec/]
disabled = false
index = modsecurity
sourcetype = json" | sudo tee -a /opt/splunkforwarder/etc/system/local/inputs.conf

/opt/splunkforwarder/bin/splunk add forward-server <host>:<port>

/opt/splunkforwarder/bin/splunk start --accept-license


