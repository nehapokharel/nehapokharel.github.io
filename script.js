fetch('https://api.github.com/users/nehapokharel')
    .then(response => response.json())
    .then(function(data){
        let followersCount = data['followers']
        let followersInfo = `I have been folllowed by ${followersCount} awesome people`
        document.getElementById('profileImage').src=data['avatar_url']
        document.getElementById('fullName').textContent=data['name']
        document.getElementById('followersInformation').textContent=followersInfo
        document.getElementById('githubLink').href=data['html_url']
        document.getElementById('mainContainer').hidden = false
        document.getElementById('loading').hidden = true
       
        const reposItems = document.querySelector(".reposItems").children
        let total_repos = data['public_repos']
        let previous = document.querySelector(".previous");
        let next = document.querySelector(".next");
        let currrent_page=1;
        let total_max=5;
        fetch(data['repos_url'] + '?page=current_page&per_page=total_max')
        .then(response => response.json())
        .then(function(data){

            let repos = data.map(repoObj => repoObj)

            repos.forEach(repoFunction);            
            function repoFunction(items,index) {
                document.getElementById("reposInfo").innerHTML += "<a>"+ items.full_name + "</a>" + "<br>";
            }

            previous.addEventListener("click", function(){
                currrent_page--;
                showItems();
            })
            next.addEventListener("click", function(){
                currrent_page++;  
                showItems();  
            })
        
            function showItems(){
                for(let i =0; i<reposItems.length; i++){
                    reposItems[i].classList.remove("show")
                    reposItems[i].classList.add("hide") 
                    if(i>=(currrent_page*total_max)-total_max && i<total_max*total_max){
                        reposItems[i].classList.remove("hide")  
                        reposItems[i].classList.add("show") 
                    }   
                }
                
            }

            window.onload=showItems();
          
            
        })

    })