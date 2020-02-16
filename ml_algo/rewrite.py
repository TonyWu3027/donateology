import numpy as np
import sklearn

class Hospital:

    def __init__(self):
        self.money = 0
        self.__temp_model = None
        # predefined median value for data testing
        self.__OUTPATI = 6900
        self.__EMPLOYEE = 11000
        self.__HOSPITALIZED = 310
        self.__BEDS = 9000
        self.__MONEYNEEDED = 7500000
        self.__MONEYSD = 1800000
        # default value to train the model
        self.__medians = [self.__OUTPATI, self.__EMPLOYEE, self.__HOSPITALIZED, self.__BEDS]
        self.__sd = [900, 2900, 90, 1100] # arbitrary value standard deviation as dummy data
        self.__weights = self.trainHosp()
        # train a model and store the coefficient locally

    def get_data(self, records):
        dataset = []  # 100 instances, 4 features
        for i in range(len(self.__medians)):
            dataset.append(np.random.normal(self.__medians[i], self.__sd[i], records).tolist())
        dataset = np.transpose(dataset).tolist()
        # generate random data for training using numpy build in library
        return dataset

    def get_money(self, records):
        money = np.random.normal(self.__MONEYNEEDED, self.__MONEYSD, records).tolist()
        return money

    def reset_model(self):
        self.__weights = self.trainHosp()

    def trainHosp(self):
        # ML- regression to get the general formula   where x = all the feature and y = money for hospital needed a day
        # Return weights of demands as a general cases with each time of Hospital with label
        import numpy as np
        from sklearn.linear_model import LinearRegression
        X = np.array(self.get_data(100))
        y = np.array(self.get_money(100))
        # train our model using linear model with 100 generated random data
        reg = LinearRegression().fit(X, y)
        return reg.coef_

    def get_demand(self):
        hospital = self.get_data(5)
        demands = [0] * (len(hospital))  # hospital's length is the number of hospital
        for i in range(len(hospital)):
            for j in range(len(self.__weights)):
                demands[i] += self.__weights[j] * hospital[i][j]  # the ith Hospitals's jth feature
        # RETURN the demands of the hospital as a scale
        return demands

    def set_temp_test(self):
        self.__temp_model = self.get_demand()

    def distribution(self, money):
        SUM = sum(self.__temp_model)
        distri = [0] * (len(self.__temp_model))
        for i in range(len(self.__temp_model)):
            distri[i] = money * (self.__temp_model[i] / SUM)
        return distri

    def getDistri(self, money):
        # demands is a vector that consists demands value of all the current hospital
        demands = self.get_demand()
        # Money is a scala that note the total money distributed
        # RETURN a vector [vi] denoting the money distributed for each hospital
        SUM = sum(demands)
        print(demands)
        distri = [0] * (len(demands))
        for i in range(len(demands)):
            distri[i] = money * (demands[i] / SUM)
        return distri
        
'''
tony = Hospital()
tony.set_temp_test()
tony.getDistri(400)
num = input("put: ")
while num != "stop":
    try:
        print(tony.distribution(int(num)))
        num = input("sadd:   ")
    except:
        num = input("sth:   ")
'''
