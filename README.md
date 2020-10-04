# F-Blog : Flask app for blog


# Install
Default Git version is the master branch

    # clone the repository
    $ git clone https://github.com/jinoyparekh/F-Blog.git
    $ cd flask
    # checkout the correct version
    $ git tag
    $ git checkout latest-tag-found-above
    $ cd F-Blog

Create and activate virtualenv on Linux/Mac Terminal

    $ python3 -m venv venv
    $ . venv/bin/activate

Create and activate virtualenv on Windows CMD/PS

    $ py -3 -m venv venv
    $ venv\Scripts\activate.bat

Install F-Blog

    $ pip install -e .
    
    
# Run

Run on Linux/Mac Terminal

    $ export FLASK_APP=F-Blog
    $ export FLASK_ENV=development
    $ flask init-db
    $ flask run

Run on Windows CMD/PS

    > set FLASK_APP=F-Blog
    > set FLASK_ENV=development
    > flask init-db
    > flask run

Open http://127.0.0.1:5000 in a browser


# Test

Run Test

    $ pip install '.[test]'
    $ pytest

Run Test with coverage report

    $ coverage run -m pytest
    $ coverage report
    $ coverage html  # open htmlcov/index.html in a browser
