class ActuatorPayload(object):
	 def __init__(self, data=None):
	 	data = dict(data)
	 	for key,val in data.items():
	 		setattr(self, key, self.compute_attr_value(val))
	 		
	 def compute_attr_value(self,value):
	 	if type(value) is list:
	 		return [self.compute_attr_value(x) for x in value]
	 	elif type(value) is dict:
	 		return ActuatorPayload(value)
	 	else:
	 		return value 	