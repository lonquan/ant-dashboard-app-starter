<?php
namespace Deployer;

require 'recipe/common.php';

// Project name
set('application', 'ccb-app');

// Project repository
set('repository', 'git@e.coding.net:ant-dev/ccb_mlc/app.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
set('shared_files', [
  '.env'
]);
set('shared_dirs', []);

// Writable dirs by web server
set('writable_dirs', []);
set('allow_anonymous_stats', false);

set('keep_releases', 5);
set('writable_use_sudo', false);
// Hosts

host('139.155.41.188')
  ->stage('production')
  ->port(8312)
  ->user('root')
  ->set('branch', 'master')
  ->set('http_user', 'www')
  ->set('deploy_path', '/data/wwwroot/ccb.antapis.com')
  ->forwardAgent(true)
  ->multiplexing(true)
  ->identityFile('/Users/quan/Desktop/code/cert/home_key.pem')
  ->addSshOption('UserKnownHostsFile', '/dev/null')
  ->addSshOption('StrictHostKeyChecking', 'no');

// Tasks
task('update_dir_permissions', function () {
  run('sudo chown www:www {{deploy_path}} -R');
});

task('build', function () {
  run('cd {{release_path}} && sudo npm install');
  run('cd {{release_path}} && npm run generate');
});

task('deploy', [
  'deploy:info',
  'deploy:prepare',
  'deploy:lock',
  'deploy:release',
  'deploy:update_code',
  'deploy:shared',
  'deploy:clear_paths',
  'deploy:symlink',
  'deploy:unlock',
  'update_dir_permissions',
  'cleanup',
  'success',
]);

// [Optional] If deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
before('deploy:symlink', 'build');
