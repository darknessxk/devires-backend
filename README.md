# Devires Backend Test


## How to use

In steps I will show you how to install and user this api



- Install our dependencies using your package manager (yarn | npm)

```yarn``` or ```npm install```

* Generate Json Web Token keys

```yarn keys:generate``` or ```npm run keys:generate```

* Prepare your env if you want to change your keys path
* Configurate TypeORM using the ```ormconfig.example.json``` file
* Migrate database using the following commands

```yarn typeorm migration:run``` or ```npm run typeorm migration:run```

Now you are good to go

---

##  Building the system

If you want to build the code just run ```yarn build``` or ```npm run build```

---

## Checking Test Suite Coverage

```yarn coverage``` or ```npm run coverage```

It will export coverage data to folder ```./coverage```

---

## Documentation

Run the following command

```yarn doc``` or ```npm run doc```

---

## Running Test

Our tests are developed based on to **Jest** testing framework to run our test suites just run

```yarn test``` or ```npm run test```