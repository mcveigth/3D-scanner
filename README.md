# 3DShock

3DShock is a 3D full body scanner that utilizes a cluster of Raspberry Pi boards to capture 90 pictures of yourself. These images can later be rendered into a photogrammetry software to generate a 3D model of your body.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The 3DShock project aims to provide an affordable and accessible solution for capturing high-quality 3D models of the human body. By using a cluster of Raspberry Pi boards, we can distribute the computational load and capture multiple images simultaneously, reducing the scanning time and improving the overall efficiency.

## Installation

To set up the 3DShock project, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/3DShock.git](https://github.com/mcveigth/3D-scanner.git
   cd 3DScanner
   ```

2. Set a python virtual environment:
   ```shell
   python -m venv server/env/
   ```
   
3. Install the necessary dependencies:

   ```shell
   ~/3DScanner/env/bin/python -m pip install -r requirements.txt
   ```
   
4. Run the scanner script:

   ```shell
   ~/3DScanner/env/bin/python server/main.py
   ```

   This will initiate a web-based app to initiate the capturing process

## Usage

After completing the installation steps, you can use the 3DShock scanner as follows:

1. Position yourself within the scanning area.

2. Run the scanner script on your Raspberry Pi cluster.

3. The cameras will automatically capture the images from different angles.

4. Once the scanning process is complete, transfer the captured images to your computer.

5. Use a photogrammetry software (e.g., Meshroom, Agisoft Metashape, Reality Capture) to process the images and generate a 3D model.

6. Fine-tune the model as necessary and export it in the desired format (e.g., OBJ, STL).
