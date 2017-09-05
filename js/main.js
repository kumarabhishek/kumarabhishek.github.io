document.addEventListener('DOMContentLoaded', function(){
    var landing = document.querySelector('#landing'), explore = document.querySelector('#explore');
    /*
    var i, currentLink, sections = [], sectionDomList = document.querySelectorAll("#rctr section");
    sectionDomList.forEach(function(v){
        sections.push({id: v.id, ot: v.offsetTop});
    });
    sections.sort(function(a, b){
        return b.ot - a.ot;
    });
    
    document.querySelector('#nav > ul').addEventListener('click', function(e){
        var node = e.target;
        if(node.localName === 'a' && node !== currentLink){
            hl = false;
            node.classList.add('active');
            currentLink && currentLink.classList.remove('active');
            currentLink = node;
            setTimeout(function(){
                hl = true;
            }, 500);
        }
    });
    var hl = true, sb = document.querySelector('#landing .button'), lctr = document.querySelector('#lctr'),
    summary = document.querySelector('#summary'), explore = document.querySelector('#explore'),
    landing = document.querySelector('#landing');
    function highlightLink(id){
        //console.log(id);
        var node = document.querySelector('#nav a[href="#'+id+'"]');
        node.classList.add('active');
        if(currentLink && node != currentLink){
            currentLink.classList.remove('active');
        }
        currentLink = node;
        
        //location.hash = id;
        //history.pushState(null, null, '#'+id);
    }


    addEventListener('scroll', function(e){
        var i, node, st = document.body.scrollTop;
        if(hl){
            for(i in sections){
                console.log(sections[i], st);
                if(st+100 >= sections[i].ot){
                    //setTimeout(function(){highlightLink(sections[i].id);},500);
                    highlightLink(sections[i].id);
                    break;
                }
            }
            if((innerHeight + scrollY) >= document.body.scrollHeight){
                highlightLink(sections[0].id);
            }
        }
    });
    */

    document.querySelector('#landing .button.explore').addEventListener('click', function(){
        landing.classList.remove('active');
        explore.classList.add('active');
        /*
        sectionDomList = document.querySelectorAll("#rctr section");
        sectionDomList.forEach(function(v){
            sections.push({id: v.id, ot: v.offsetTop});
        });
        sections.sort(function(a, b){
            return b.ot - a.ot;
        });
        */
    });
    
    //landing.classList.remove('active');
    //explore.classList.add('active');

    document.querySelector('#nav a[href="'+(location.hash || '#summary')+'"]').classList.add('active');
    document.querySelectorAll('#nav a').forEach(function(item){
        item.addEventListener('click', function(e){
            var curActive = document.querySelector('#nav a.active');
            curActive && curActive.classList.remove('active');
            item.classList.add('active');
        });
    })
    /*
    function toggleNav(){
        document.querySelector('#nav').classList.toggle('active');
        document.querySelector('#toggle>span').classList.toggle('icon-menu');
        document.querySelector('#toggle>span').classList.toggle('icon-cross');
    }
    document.querySelector('#toggle>span').addEventListener('click', toggleNav);
    smoothScroll.init({offset: 100});
    */
});
