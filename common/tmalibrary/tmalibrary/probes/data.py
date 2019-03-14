class Data:
    def __init__(self, type="measurement", descriptionId=-10, observations=None):
        self.type = type
        self.descriptionID = descriptionId
        if observations is None:
            observations = []
        self.observations = observations

    def add_observation(self, observation):
        self.observations.append(observation)

    def reprJSON(self):
        return dict(type=self.type, descriptionId=self.descriptionID, observations=self.observations)
