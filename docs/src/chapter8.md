# 8. The Domain Sub-module

UNDER DEVELOPMENT!

The module AppliAR follows the same structure as we have discussed in the Account module. We go deeper into the main differences.

### Contents

```@contents
Pages = ["chapter8.md"]
```

## The folder structure



ᵥ📁AppliAR
   📁 docs #1
		 📁 src
		 📁 stable
       📁 assets #1
       📁 chapter1 #1
       📁 chapter2 #1
       📁 chapter3 #1
       📁 chapter4 #1
       📄 index.html #1
       📄 search_index.js #1
  ᵥ📁 src #2
    ᵥ📁 api
       📄 Api.jl
       📄 spec.jl #3
    ᵥ📁 domain
       📄 Domain.jl
       📄 spec.jl #3
    ᵥ📁 infrastructure
       📄 Infrastructure.jl
       📄 db.jl
       📄 doc.jl #3
     📄 AppliAR.jl
     📄 Report.jl
  ᵥ📁 test
     📄 runtests.jl #4
   📄 bank.csv	 
   📄 LICENCE
   📄 Project.toml  #5
   📄 README.md
