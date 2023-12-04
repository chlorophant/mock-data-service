# mock-service

Description:
This is a POC service I made to see how quickly a basic crud api could be developed using bun. It's been organized to be as easy as possible to build with minimal amount of dev effort. The goal of this service was to be able to be modified and quickly used in corporate settings to get products out the door as quickly as possible.


Disclaimer:
If you are using windows, you will need to first install wsl2: [installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install).

Once installed, all of the following commands should be run inside your linux shell.

---

1. Make sure to clone the code to your linux filesystem

2. Install bun:

```
curl -fsSL https://bun.sh/install | bash
```

3. To install dependencies go to the root of the project and run:

```bash
bun install
```

4. To run the app:

```bash
bun dev
```

5. See the swagger at [here](http://localhost:3000/swagger)

6. To generate mock data records from the swagger page under "seed" select the "/resources/seed/{numberOfRecords}" and click "try it out". Enter the number of mock records you want to create and click execute. This will create the selected number of records across all resource types and also create relationships between them.

7. Query any of the endpoints listed in the swagger to interact with the mock data.