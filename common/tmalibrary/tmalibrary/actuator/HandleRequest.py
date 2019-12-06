from .KeyManager import KeyManager
import base64
import json
from .ActuatorPayload import ActuatorPayload

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
		response = str(response) + "\n"
		response = response + str(signedResponseEncoded)
		return response

	def processRequest(self, request):

		# TODO: Handle Requests where the key is not valid

		privateKeyPath = "keys/priv-key-actuator"
		keymanager = KeyManager()
		privateKey = keymanager.getPrivateKey(privateKeyPath)
		decryptData = keymanager.decrypt(request, privateKey)
		input = json.loads(decryptData)
		payload = ActuatorPayload(input)
		return payload
