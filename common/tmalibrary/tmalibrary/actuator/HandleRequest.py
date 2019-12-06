from .KeyManager import KeyManager
import base64
import json
from .ActuatorPayload import ActuatorPayload
import os
import tempfile

class HandleRequest:

	def generateResponse(self, plainResponse):

		keymanager = KeyManager()
		privateKeyPath = "keys/priv-key-actuator"
		privateKey = keymanager.getPrivateKey(privateKeyPath)

		signedResponse = keymanager.sign(plainResponse,privateKey)
		signedResponseEncoded = base64.b64encode(signedResponse)

		publicKeyExecutorPath = "keys/pub-key-executor"
		publicKeyExecutor = keymanager.getPublicKey(publicKeyExecutorPath)
		encryptedMessage = keymanager.encrypt(plainResponse,publicKeyExecutor)
		response = base64.b64encode(encryptedMessage)
		fp = tempfile.TemporaryFile()
		fp.write(response)
		fp.write(os.linesep)
		fp.write(signedResponseEncoded)
		fp.close()
		return fp

	def processRequest(self, request):

		# TODO: Handle Requests where the key is not valid

		privateKeyPath = "keys/priv-key-actuator"
		keymanager = KeyManager()
		privateKey = keymanager.getPrivateKey(privateKeyPath)
		decryptData = keymanager.decrypt(request, privateKey)
		input = json.loads(decryptData)
		payload = ActuatorPayload(input)
		return payload
