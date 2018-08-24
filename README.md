# VIN DECODER

Decodes an excel (.xlsx) spreadsheet containing vin numbers and their corresponding Kit Numbers.
the format of the spread sheet is two columns the first containing the vin numbers and the second containing the kit numbers desired to go with that vin.

## downloading onto lightsail bitnami server
first create apps directory
```
cd stack
sudo ./use_nodejs
mkdir apps
```
Git clone or copy your Express project inside apps folder.
make sure you name your gitclone 'myapp' or else you will have to change all the following steps to accommodate the name change...

## installing onto lightsail bitnami server
### 1.- Create directories

For that, you should run the following commands:

```
sudo mkdir /opt/bitnami/apps/myapp/conf
sudo mkdir /opt/bitnami/apps/myapp/htdocs
```
### 2.- Create two files

For that, you can run the following commands:
```
touch /opt/bitnami/apps/myapp/conf/httpd-prefix.conf
touch /opt/bitnami/apps/myapp/conf/httpd-app.conf
```
### 3.- Add content to the first file

You can edit the file using any text editor, for example nano
```
nano /opt/bitnami/apps/myapp/conf/httpd-prefix.conf
```
The above command opens the text editor, you should copy/paste or write the following line:
```
Include "/opt/bitnami/apps/myapp/conf/httpd-app.conf"
```
Close the editor using Ctrl+X(you will be prompted to save your file if you have not)

### 4.- Add content to the second file

You can edit the file using any text editor, for example nano
```
nano /opt/bitnami/apps/myapp/conf/httpd-app.conf
```
The above command opens the text editor, you should copy/paste or write the following line:
```
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
```
Close the editor using Ctrl+X(you will be prompted to save your file if you have not)

### 5.- Edit Apache config file

Once you have created the files and directories above, add the following line to the end of the main Apache configuration file. Open the file (again using nano):
```
nano /opt/bitnami/apache2/conf/bitnami/bitnami-apps-prefix.conf
```
The above command opens the text editor, you should copy/paste or write the following line:
```
Include "/opt/bitnami/apps/myapp/conf/httpd-prefix.conf"
```
Close the editor using Ctrl+X(you will be prompted to save your file if you have not)

### 5.5. - Middle step to download NPM package because server is linux
the app was created on windows therefore one npm package "sqlite" was not cross compatible and therefore needs to be installed on the server.

navigate to /opt/bitnami/apps/myapp and then run the following commands
```
sudo npm install sqlite
sudo npm install
```

### 6.- Restart apache

For that execute
```
sudo /opt/bitnami/ctlscript.sh restart apache
```
### 7.- Start the Express server

```
forever -w ./bin/www
```

##additional instructional resources


https://medium.com/@sharmasha2nk/aws-lightsail-bitnami-nodejs-letsencrypt-cf653573b8a1


https://stackoverflow.com/questions/49384925/how-to-create-opt-bitnami-apps-myapp-conf-httpd-prefix-conf-and-include-opt-bit
