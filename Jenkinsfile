@Library('Shared') _

pipeline{

    agent any

    environment{
        SONAR_HOME= tool "Sonar"
    }

    stages{
        stage("Workspace Cleanup"){
            steps{
                script{
                    echo "Cleaning the Workspace Before Proceeding"
                    cleanWs()
                }
                
            }
        }


        stage("Git: Clone"){
            steps{
                script{
                    clone("https://github.com/Shubhankar-24x/book_library.git", "main")
                }

            }
        }

        
        stage("Trivy: Filesystem Scanning"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency Check"){
            steps{
                script{
                    owasp_dependency_check()
                }
            }
        }

        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar","bms","bms")
                }
            }
        }

        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
                }
            }
        }


        stage("Docker Build & Deploy"){
            steps{
                script{
                    

                    sh "docker compose down && docker compose up -d --build "
                }
            }
        }

    }
}
