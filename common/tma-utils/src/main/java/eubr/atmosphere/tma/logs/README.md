This is a component from TMA-Utils that will allow each component of the TMA to save its logs on the database. For that, each component must import the package TMA-Utils and make use of the class "LogManager"(i.e. "import eubr.atmosphere.tma.logs.LogManager").

Whenever we want to log on the database we call the only method "insertLog" of LogManager's Class and give it the parameters according to what we are logging.

For saving the data on the database, this class invokes another class, DatabaseManager, present in the package `eubr.atmosphere.tma.database`.


Next, we present the table that represent this logs on the database and we describe each parameter of it.

![Log table used to save logs on database](https://github.com/Jodao/TMA/blob/main/tma-framework/common/tma-utils/src/main/java/eubr/atmosphere/tma/logs/LogsTable.png)

Fields explanation:

* `LogTime` -> It is the time the log happens and it's used as primary key

* `origin` -> Subject that dispatches the log.   (It can be a Plan, Quality Model, etc...?)

* `originId` -> In the case of a Plan it is the planID

* `description` -> Text that clarifies the log, something readable and that makes easy to understand what is the log about. 

* `previousValue, newValue` -> It identifies the old and new values related to a context. In Quality Models context it is the previous and the actual value of some weigth. In the case of a Plan, it is the previous and new PodCount value of a resource.

* `component` -> It identifies the component of the TMA architeture that is logging(p.e. analyzer, planner, executer, monitor,etc...).

* `logGroupId` -> It identifies a group of logs that had the same purpose. Per example, changing the weights of 2 nodes on the Quality Model.

* `target,targetId` -> These fields identify the target of some action in a context. In the context of changing Resource's pod count, target identifies the name of the Resource and targetId the corresponding Id in the Resource Table. 


In this folder there is a script for creating the table in the database named `logsTableScript`.
