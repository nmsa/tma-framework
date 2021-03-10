This is a component from TMA-Utils that will allow each component of the TMA to save its logs on the database. For that, each component must import the package TMA-Utils and make use of the class "LogManager" (i.e. "import eubr.atmosphere.tma.logs.LogManager").

Whenever we want to log on the database we call the only method "insertLog" of LogManager's Class and give it the parameters according to what we are logging.

For saving the data on the database, this class invokes another class, DatabaseManager, present in the package `eubr.atmosphere.tma.database`.


Next, we present the table that represent this logs on the database and we describe each parameter of it.

![Log table used to save logs on database](https://github.com/Jodao/TMA/blob/main/tma-framework/common/tma-utils/src/main/java/eubr/atmosphere/tma/logs/LogsTable.png)

Fields explanation:

* `LogTime` -> It is the time the log happens and it's used as primary key.

* `origin` -> It is the subject that dispatches the log. For example, it can be a Plan, Quality Model, etc...

* `originId` -> It is a identifier related to the subject that dispatched the log. For example, in the case of a Plan it is the planID.

* `description` -> It is a text that clarifies the log, something readable and that makes easy to understand what is the log about. For example, in the Plan's case, something like "Executing Plan activated by the rule MyRule". 

* `previousValue, newValue` -> These are identifiers of the old and new values related to a context. For example, in Quality Models' context it is the previous and the actual value of some weigth. In the case of a Plan, it is the previous and new PodCount value of a resource.

* `component` -> It is a identifier of the component of the TMA architeture that is logging. For example, analyzer, planner, executer, monitor, etc...

* `logGroupId` -> It is a identifier of a group of logs that had the same purpose through a number identifier that is automatically assigned and incremented. For example, when changing the weights of 2 nodes on the Quality Model both logs will have this parameter with the same number identifier.

* `target,targetId` -> These are identifiers of the target of some action in a context. For example, in the context of changing Resource's pod number, target identifies the name of the Resource and targetId the corresponding Id in the Resource Table. 


In the following link https://github.com/nmsa/tma-framework-k/tree/master/database there is a script for creating the table in the database named `logsTableScript.sql`.
