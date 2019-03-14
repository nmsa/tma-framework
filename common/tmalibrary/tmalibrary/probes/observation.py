class Observation:
    def __init__(self, time=-1, value=0):
        self.time = time
        self.value = value

    def reprJSON(self):
        return dict(time=self.time, value=self.value)