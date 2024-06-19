define({ 

 onPreshow : function(){
    var data = [
      {
        "title" : "Object Services",
        "desc1" : "Object Services is a feature of VoltMx Foundry that enables model-driven app design and development by following a microservices architectural approach to create reusable components. With Object Services, you can define your preferred app data model that defines how your application wants to interact with its data. There is a clear separation between the app data model and how it maps to the back-end systems of record. The defined app data model and mappings encapsulate the back-end data and APIs and abstract the API complexity from your client application.<br><br>With Object Services, you can create app models from line-of-business (LOB) objects and define service-driven objects from existing APIs in your enterprise. LOB objects are accessed by using the Voltmx Foundry business adapters that enable a back-end developer to visually discover and select entities exposed by the LOB system. A service-driven object is created from a set of existing VoltMx Foundry Integration Services that connect to existing API endpoints or VoltMx Foundry Orchestration Services that combine multiple APIs into a new composite or aggregate API.",
        "desc2" : "The Employee Directory Application makes use of object services in order to fetch employee data from the back end and show on the front-end app. The video placed below provides an overview of the object services in VoltMx Foundry and uses a small example of an Orders application to demonstrate the usage of the same.<br><br>Please follow the video below to get an overview:",
        "video2" : "https://www.youtube.com/watch?v=I82jkllMVP4",
        "image2" : "object.png",
        "link" : 'Please find below the link for the video tutorials:<br><a href = "https://www.youtube.com/watch?v=I82jkllMVP4"> Object Services Overview </a><br><br>Please find below the link for the documentation site:<br><a href =  "https://opensource.hcltechsw.com/volt-mx-docs/docs/documentation/Foundry/voltmx_foundry_user_guide/Content/Objectservices.html"> Object Services Documentation </a>'
      },
       {
        "title" : "Components",
        "desc1" : "Components provide a powerful way to create complex applications quickly. You can download a rich assortment of components from VoltMx Marketplace, or create your own reusable components, and then drag and drop the components into your application to create sophisticated, full-featured applications without writing all of the code.<br>For example, suppose you want to create a mobile application that lets users log in to their account and display an account overview. You can build a log-in screen by downloading a log-in component from VoltMx Marketplace, and then dragging and dropping it onto a form.",
        "desc2" : "The Employee Directory App makes use of VoltMx Marketplace components such as Log In Component, Sliding Menu Component, and List-Detail Component. The video tutorial specified below talks about authoring a simple UI component. The example used in the video is an Email Id Text Field component which accepts an email id and validates for the correct syntax and business rules. This will help you get a basic idea about components.",
        "video2" : "https://www.youtube.com/watch?v=RuOerVZufR8",
        "image2" : "component.png",
        "link" : 'Please find below the link for the video tutorials:<br><a href = "https://youtu.be/VTaeJKqvKqc"> Component Creation </a><br><br>Please find below the link for the documentation site:<br><a href = "https://opensource.hcltechsw.com/volt-mx-docs/docs/documentation/Iris/iris_user_guide/Content/C_ComponentsOverview.html"> Components Overview </a><br><a href = "https://opensource.hcltechsw.com/volt-mx-docs/docs/documentation/Iris/iris_user_guide/Content/C_ComponentsOverview.html"> Creating a Component </a><br><a href ="https://opensource.hcltechsw.com/volt-mx-docs/docs/documentation/Iris/iris_user_guide/Content/C_ComponentsOverview.html"> Using Components </a>'
      }
    ];
    this.view.knowledgeframework.setData(data);
  }
 });