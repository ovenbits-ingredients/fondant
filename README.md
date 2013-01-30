# Fondant

Proof-of-concept HTML5 editor using jQuery and HTML5 ContentEditable.

## Requirements

Non-gem requirements include:

* Ruby 1.9.3
* Redis

## Setup

```bash
git clone git@github.com:ovenbits-ingredients/fondant.git
cd fondant

bundle install  # install dependencies
rake seed       # seed lorem ipsum content
rake server     # start the server
```

Point your browser to <http://localhost:9292> to see the editor.
