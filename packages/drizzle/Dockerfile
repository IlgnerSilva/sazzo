FROM bitnamilegacy/postgresql:17.6.0

# Credenciais fixas, só para desenvolvimento local
ENV POSTGRESQL_USERNAME=dev \
    POSTGRESQL_PASSWORD=dev \
    POSTGRESQL_DATABASE=dev_db \
    POSTGRESQL_POSTGRES_PASSWORD=postgres \
    POSTGRESQL_LOG_CONNECTIONS=true \
    POSTGRESQL_LOG_DISCONNECTIONS=true \
    POSTGRESQL_EXTRA_FLAGS="-c log_statement=all -c log_min_duration_statement=0"

EXPOSE 5432
