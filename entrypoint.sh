#!/bin/sh
set -eu

ENV_STR=''

ALL_ENV="$(env | grep REACT_APP | sed -e 's/=.*//g') NODE_ENV"

list_env_var_names() {
  for var in $ALL_ENV
  do
    ENV_STR="$ENV_STR"" \$\$""$var"
  done
}

js_files_envsubst() {
  JS_FILES=$(find /usr/share/nginx/html -type f -name "*.js")
  GZ_FILES=$(find /usr/share/nginx/html -type f -name "*.js.gz")

  for file in $JS_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done

  for file in $GZ_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done
}

css_files_envsubst() {
  CSS_FILES=$(find /usr/share/nginx/html -type f -name "*.css")
  CSS_GZ_FILES=$(find /usr/share/nginx/html -type f -name "*.css.gz")

  for file in $CSS_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done

  for file in $CSS_GZ_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done
}

html_files_envsubst() {
  HTML_FILES=$(find /usr/share/nginx/html -type f -name "*.html")
  HTML_GZ_FILES=$(find /usr/share/nginx/html -type f -name "*.html.gz")

  for file in $HTML_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done

  for file in $HTML_GZ_FILES
  do
     cp "$file" "$file".copy
       envsubst "$ENV_STR" < "$file".copy > "$file"
       rm "$file".copy
  done
}

list_env_var_names
js_files_envsubst
css_files_envsubst
html_files_envsubst

cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.copy
envsubst "$ENV_STR" < /etc/nginx/nginx.conf.copy > /etc/nginx/nginx.conf
rm /etc/nginx/nginx.conf.copy

exec "$@"