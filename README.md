This is a new project of an Angular based application to display poems.

Please go to the `front/` directory to find the README file with instructions on how to run the Angular application, back end server instructions will be later added in the `back/` directory.

For angular CLI, please look at :

ng generate

Generates and/or modifies files based on a schematic.

Commands:
  ng generate <schematic>              Run the provided schematic.                                                                [default]
  ng generate ai-config                Generates AI configuration files for Angular projects. This schematic creates configuration files
                                       that help AI tools follow Angular best practices, improving the quality of AI-generated code and
                                       suggestions.
  ng generate app-shell                Configures your project to generate an app-shell during build time.
  ng generate application [name]       Generates a new Angular application within your workspace. This schematic sets up the foundational
                                       structure of your project, including the root component, module, and configuration files. You can
                                       customize various aspects of the application, such as routing, styling, and testing.  [aliases: app]
  ng generate class [name]             Creates a new class in your project. Classes are the fundamental building blocks for object-oriented
                                       programming in TypeScript. They provide a blueprint for creating objects with properties and        
                                       methods. This schematic helps you generate a new class with the basic structure and optional test   
                                       files.                                                                                 [aliases: cl]
  ng generate component [name]         Creates a new Angular component. Components are the basic building blocks of Angular applications.  
                                       Each component consists of a TypeScript class, an HTML template, and an optional CSS stylesheet. Use
                                       this schematic to generate a new component in your project.                             [aliases: c]
  ng generate config [type]            Generates configuration files for your project. These files control various aspects of your
                                       project's build process, testing, and browser compatibility. This schematic helps you create or     
                                       update essential configuration files with ease.
  ng generate directive [name]         Creates a new directive in your project. Directives are used to extend the behavior or appearance of
                                       HTML elements and components. They allow you to manipulate the DOM, add custom attributes, and      
                                       respond to events. This schematic generates the necessary files and boilerplate code for a new      
                                       directive.                                                                              [aliases: d]
  ng generate enum [name]              Creates a new enum in your project. Enums (enumerations) are a way to define a set of named
                                       constants, making your code more readable and maintainable. This schematic generates a new enum with
                                       the specified name and type.                                                            [aliases: e]
  ng generate environments             Generates and configures environment files for your project. Environment files allow you to define  
                                       different settings and configurations for various environments, such as development, testing, and   
                                       production. This schematic helps you create and manage these files, making it easier to customize   
                                       your application's behavior for each environment.
  ng generate guard [name]             Creates a new route guard in your project. Route guards are used to control access to parts of your 
                                       application by checking certain conditions before a route is activated. This schematic generates a  
                                       new guard with the specified name, type, and options.                                   [aliases: g]
  ng generate interceptor [name]       Creates a new interceptor in your project. Interceptors are used to intercept and modify HTTP       
                                       requests and responses before they reach their destination. This allows you to perform tasks like   
                                       adding authentication headers, handling errors, or logging requests. This schematic generates the   
                                       necessary files and boilerplate code for a new interceptor.
  ng generate interface [name] [type]  Creates a new interface in your project. Interfaces define the structure of objects in TypeScript,  
                                       ensuring type safety and code clarity. This schematic generates a new interface with the specified  
                                       name and type.                                                                          [aliases: i]
  ng generate library [name]           Creates a new library project in your Angular workspace. Libraries are reusable collections of      
                                       components, services, and other Angular artifacts that can be shared across multiple applications.  
                                       This schematic simplifies the process of generating a new library with the necessary files and      
                                       configurations.                                                                       [aliases: lib]
  ng generate module [name]            Creates a new, generic NgModule definition in the given project.                        [aliases: m]
  ng generate pipe [name]              Creates a new pipe in your project. Pipes are used to transform data for display in templates. They 
                                       take input values and apply a specific transformation, such as formatting dates, currency, or       
                                       filtering arrays. This schematic generates the necessary files and boilerplate code for a new pipe. 
                                                                                                                               [aliases: p]
  ng generate resolver [name]          Creates a new resolver in your project. Resolvers are used to pre-fetch data before a route is      
                                       activated, ensuring that the necessary data is available before the component is displayed. This can
                                       improve the user experience by preventing delays and loading states. This schematic generates a new 
                                       resolver with the specified name and options.                                           [aliases: r]
  ng generate service [name]           Creates a new service in your project. Services are used to encapsulate reusable logic, such as data
                                       access, API calls, or utility functions. This schematic simplifies the process of generating a new  
                                       service with the necessary files and boilerplate code.                                  [aliases: s]
  ng generate service-worker           Adds a service worker to your project. Service workers enable your application to work offline or on
                                       low-quality networks by caching assets and intercepting network requests. This schematic configures 
                                       your project to use a service worker.
  ng generate web-worker [name]        Creates a new web worker in your project. Web workers allow you to run JavaScript code in the       
                                       background, improving the performance and responsiveness of your application by offloading
                                       computationally intensive tasks. This schematic generates the necessary files for a new web worker
                                       and provides an optional code snippet to demonstrate its usage.

Arguments:
  schematic  The [collection:schematic] to run.                                                                                    [string]

Options:
      --help         Shows a help message for this command in the console.                                                        [boolean]
      --interactive  Enable interactive input prompts.                                                            [boolean] [default: true]
  -d, --dry-run      Run through and reports activity without writing out results.                               [boolean] [default: false]
      --defaults     Disable interactive input prompts for options with a default.                               [boolean] [default: false]
      --force        Force overwriting of existing files.                                                        [boolean] [default: false]

