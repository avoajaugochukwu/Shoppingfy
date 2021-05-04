"""
Django settings for cumba_bikes project.

Generated by 'django-admin startproject' using Django 3.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path
import dj_database_url
from dotenv import load_dotenv
load_dotenv()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DEV_ENV = os.getenv('DEV_ENV')

if int(DEV_ENV) == 1:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    CORS_ORIGIN_WHITELIST = (
        'http://localhost:3000',
        'http://127.0.0.1:8000',
    )
    # print(DEV_ENV)
    # print('-------------- DEVELOPMENT ENVIRONMENT ----------')
else:
    ALLOWED_HOSTS = ['shopping-app-backend-api.herokuapp.com']
    CORS_ORIGIN_WHITELIST = (
        'https://shopping-app-frontend.herokuapp.com',
        'https://shopping-app-backend-api.herokuapp.com',
    )
    # print(DEV_ENV)
    # print('-------------- PRODDUCTION ENVIRONMENT ----------')


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    

    # 3rd Party
    'livereload',

    'cumba_api',


    # 3rd Party
    'rest_framework',
    'corsheaders',
    # 'versatileimagefield',  # For images

    # Auth
    'rest_framework.authtoken',  # For Token Authentication
    'dj_rest_auth',  # For user registration

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # whitenoise for serving static files
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    # corsheaders
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cumba_bikes.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cumba_bikes.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

SECRET_KEY = os.getenv('CUMBA_BIKES_SECRET_KEY', 'Optional default value')
CUMBA_BIKES_DATABASE_NAME = os.getenv('CUMBA_BIKES_DATABASE_NAME', 'Optional default value')
CUMBA_BIKES_DATABASE_USER_NAME = os.getenv('CUMBA_BIKES_DATABASE_USER_NAME', 'Optional default value')
CUMBA_BIKES_DATABASE_PASSWORD = os.getenv('CUMBA_BIKES_DATABASE_PASSWORD', 'Optional default value')
CUMBA_BIKES_DATABASE_HOST = os.getenv('CUMBA_BIKES_DATABASE_HOST', 'Optional default value')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': CUMBA_BIKES_DATABASE_NAME,
        'USER': CUMBA_BIKES_DATABASE_USER_NAME,
        'PASSWORD': CUMBA_BIKES_DATABASE_PASSWORD,
        # 'NAME': 'cumba_bikes',
        # 'USER': 'avoaja',
        # 'PASSWORD': 'boys2men',
        # 'HOST': CUMBA_BIKES_DATABASE_HOST,
        # 'PORT': '5432'
    }
}



# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Custom Settings
AUTH_USER_MODEL = 'cumba_api.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
PROJECT_ROOT   =   os.path.dirname(os.path.dirname(__file__))
STATIC_ROOT  =   os.path.join(PROJECT_ROOT, 'cumba_api')
STATIC_URL = '/static/'

SITE_ID = 1

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'cumba_api/static'),
)

#  Add configuration for static files storage using whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Start of Settings to use email instead of username for login
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True   
ACCOUNT_USERNAME_REQUIRED = False

# Production database 
prod_db  =  dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(prod_db)

#Following is added to enable registration with email instead of username
AUTHENTICATION_BACKENDS = (
 # Needed to login by username in Django admin, regardless of `allauth`
 "django.contrib.auth.backends.ModelBackend",

 # `allauth` specific authentication methods, such as login by e-mail
 "allauth.account.auth_backends.AuthenticationBackend",
)
# End Settings to use email instead of username for login

REST_FRAMEWORK = {
    # 'DEFAULT_RENDERER_CLASSES': [
    #     'rest_framework.renderers.JSONRenderer',
    # ],
    # 'DEFAULT_PARSER_CLASSES': [
    #     'rest_framework.parsers.JSONParser',
    # ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication'
    ],
}

REST_AUTH_SERIALIZERS = {
    
    'TOKEN_SERIALIZER': 'cumba_api.serializers.TokenSerializer',
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# For Uploaded Images
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')