## Steps:
1. clone repository  
2. create env files  
3. run docker-compose up --build  


## Env files examples:
# Root env example:

export POSTGRES_USER=test  
export POSTGRES_PASSWORD=test  
export POSTGRES_DB=tree_data  

# Backend env example:

export SECRET_KEY=ol213qr9jju1ok2nez5hs78ramht0d  
export DEBUG=1  
export DJANGO_ALLOWED_HOSTS="localhost 127.0.0.1"  
export CORS_WHITELIST=http://localhost:3000  
export SQL_ENGINE=django.db.backends.postgresql  
export SQL_DATABASE=tree_data  
export SQL_USER=test  
export SQL_PASSWORD=test  
export SQL_HOST=db  
export SQL_PORT=5432  
