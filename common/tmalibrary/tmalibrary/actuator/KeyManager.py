from Crypto.PublicKey import RSA
import Crypto.Cipher.PKCS1_v1_5
import Crypto.Signature.PKCS1_v1_5
from Crypto.Hash import SHA

import random
import os
import errno

class KeyManager:

	def decrypt(self, text, private_key_string):
		# import private key to an RSA object
		private_key = RSA.importKey(private_key_string)

		# decrypt the text with the private key
		cypher = Crypto.Cipher.PKCS1_v1_5.new(private_key)
		decryptedText = cypher.decrypt(text,15)
		return decryptedText

	def encrypt(self, text, public_key_string):
		# import public key to an RSA object
		public_key = RSA.importKey(public_key_string)

		# encrypt the plain text using the public key
		encryptedText = public_key.encrypt(text,random.randint(1,101))
		return encryptedText

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
		h = SHA.new(data)
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
