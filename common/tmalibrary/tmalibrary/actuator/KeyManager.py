from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import Crypto.Signature.PKCS1_v1_5
from Crypto.Hash import SHA
from base64 import b64decode
from base64 import b64encode

import os
import errno

class KeyManager:

	def decrypt(self, text, private_key_string):

		# import private key to an RSA object
		private_key = RSA.importKey(private_key_string)
		cipher = PKCS1_v1_5.new(private_key)

		message = cipher.decrypt(b64decode(text),"Error while decrypting")
		return message


	def encrypt(self, text, public_key_string):

		# import public key to an RSA object
		public_key = RSA.importKey(public_key_string)
		cipher = PKCS1_v1_5.new(public_key)
		ciphertext = b64encode(cipher.encrypt(bytes(text,"utf-8")))
		return ciphertext

	def getPrivateKey(self, filenameprivatekey):
                # read private key from file
		try:
			privKey = open(filenameprivatekey, "rb").read()
			return privKey

		except EnvironmentError as e:
			print(os.strerror(e.errno))
			return None

	def getPublicKey(self, filenamepublickey):
		# read public key from file
		try:
			pubkey = open(filenamepublickey, "rb").read()
			return pubkey
		except EnvironmentError as e:
			print(os.strerror(e.errno))
			return None

	# The method that signs the data using the private key that is stored in keyFile path
	def sign(self, data,keyFile):
		privateSignature = RSA.importKey(keyFile)
		encData = data.encode('utf-8')
		h = SHA.new(encData)
		signer = Crypto.Signature.PKCS1_v1_5.new(privateSignature)
		signature = signer.sign(h)
		return signature

	def verify(self, plainText,signature,publicKey):
		publicSignature = RSA.importKey(publicKey)
		h = SHA.new(plainText)
		verifier = PKCS1_v1_5.new(publicSignature)

		if verifier.verify(h,signature):
			message = "The signature is authentic"
		else:
			message = "The signature is not authentic"

		return message
