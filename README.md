# Re4SEA

The „Re4SEA“ webmap aims to visualise existing climate change risks on Southeast Asian islands and gives an overview of expected extra investment cost for energy system components to mitigate these risks. Sea-level rise, temperature increase, flooding and cyclones are considered to have substantial impacts on current and future energy infrastructure. In order to assess the islands specific situation, these risks are scaled and shown on the webmap. To detect risk patterns in the Southeast Asian region, the islands are clustered according to their site-specific risk profile. These risk cluster are also visualized on the webmap. By clicking on islands, further information is given on projected extra investment cost for different energy system components to mitigate island-specific risks. 

## Get started

Simply click on the green `Use this template` button on the left of the `Clone or download` button.

The detailed instructions to create a new repository from this template can be found [here](https://help.github.com/en/articles/creating-a-repository-from-a-template).

## src folder

This folder is where you should place the code of your package (package name to be edited in `setup.py` under name)

You can install it locally for developing with

    python setup.py install
    
More details for packaging are available on [https://packaging.python.org](https://packaging.python.org/tutorials/packaging-projects/)


## Docs

To build the docs simply go to the `docs` folder

    cd docs

Install the requirements

    pip install -r docs_requirements.txt

and run

    make html

The output will then be located in `docs/_build/html` and can be opened with your favorite browser

## Code linting

In this template, 3 possible linters are proposed:
- flake8 only sends warnings and error about linting (PEP8)
- pylint sends warnings and error about linting (PEP8) and also allows warning about imports order
- black sends warning but can also fix the files for you

You can perfectly use the 3 of them or subset, at your preference. Don't forget to edit `.travis.yml` if you want to deactivate the automatic testing of some linters!
