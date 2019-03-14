import json
class Message:
    def __init__(self, probeId=-1, resourceId=-1, messageId=-1, sentTime=-1, data=None):
        self.probeId = probeId
        self.resourceID = resourceId
        self.messageId = messageId
        self.sentTime = sentTime
        if data is None:
            data = []
        self.data = data

    def add_data(self, data):
        self.data.append(data)

    def reprJSON(self):
        return dict(probeId=self.probeId, resourceId=self.resourceID, messageId=self.messageId, sentTime=self.sentTime, data=self.data)


class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'reprJSON'):
            return obj.reprJSON()
        else:
            return json.JSONEncoder.default(self, obj)
