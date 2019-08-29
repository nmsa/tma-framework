import json
import time
from datetime import datetime
import requests
from .data import Data
from .message import Message
from .message import ComplexEncoder
from .observation import Observation


class Communication:
  def __init__(self, url, message_formated=""):
   self.url = url
   self.message_formated = message_formated

  def send_message(self, message_formated):
   # url = 'http://0.0.0.0:5000/monitor'
   self.message_formated = message_formated
   headers = {'content-type': 'application/json'}
   # return the response from Post request
   return requests.post(self.url, data=self.message_formated, headers=headers, verify='cert.pem')
