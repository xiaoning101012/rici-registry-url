pipeline {
    options {
        timeout(time: 12, unit: 'MINUTES')
    }
    agent any

    environment {
        JOB_NAME = 'sc-zqsk-pc'
        testServerIP = '192.168.1.7'
        productServerIP = '192.168.1.8'
    }

    parameters {
            booleanParam(name: 'FAST_MODE', defaultValue: false, description: '此操作将会跳过单元测试以及代码质量检查。')
    }

    stages {
        stage('开始构建流程') {

            steps {
                script {
                    echo "开始构建"
                    
                    hostIP = ""
                    

                    sh "echo 当前分支 : ${env.BRANCH_NAME}"
                    sh "echo 当前环境 : ${env.env}"
                    sh "echo 当前提交 : ${env.commit}"
                    sh "echo WORKSPACE : ${env.WORKSPACE}"
                    sh "echo GIT_BRANCH : ${env.GIT_BRANCH}"
                    sh "echo BUILD_NUMBER : ${env.BUILD_NUMBER}"
                    sh "echo JOB_NAME : ${env.JOB_NAME}"
                    sh "npm -v"
                    sh "java -version"

                    //开始打dist包
                    sh "npm install"
                    // 修改该"highlyPathogenicPreview" 为当前分支
                    if(env.BRANCH_NAME=="test"){
                        hostIP = testServerIP;
                        sh "npm run build"
                    }
                    sh "cd dist;zip -r dist.zip *"
                    // 修改”/vdb/nginx/html/ucap“路径为当前前端目录
                    sh "scp ${env.WORKSPACE}/dist/dist.zip ${hostIP}:/vdb/nginx/html/sc-zqsk-pc"
                    sh "ssh ${hostIP} \"cd /vdb/nginx/html/sc-zqsk-pc;unzip -o dist.zip\""
                }
            }
        }
    }
}
