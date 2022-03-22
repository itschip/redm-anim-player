fx_version "cerulean"
game "rdr3"
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

ui_page 'web/build/index.html'

client_script "client/**/*"
server_script "server/**/*"

lua54 "yes"

files {
  'web/build/index.html',
  'web/build/**/*'
}