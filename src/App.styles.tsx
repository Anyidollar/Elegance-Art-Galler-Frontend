/* ======================== Global Styles ====================== */
/* ======================== Header Styles Start Here ====================== */

// @import url('https://fonts.googleapis.com/css2?family=League+Script&display=swap');
import styled from 'styled-components';
import Artistic1 from './assets/Artistic1.jpg'


export const HeaderStyle = styled.header`
    background: url(${Artistic1});
    background-size: cover;
    box-sizing: border-box;

    width: 100%;
    height: 90vh;
    color: white;

    @media screen and (max-width: 600px){
      flex-direction: column;
      height: fit-content;
      width: 100%;
      margin: 17px 0px;
      padding: 20px 20px;
  }
   
    @media screen and (max-width: 992px){
      flex-direction: column;
      height: fit-content;
      width: 100%;
      margin: 17px 0px;
      padding: 20px 20px;
  }
`;

export const Title = styled.h2`
   color: white;
   font-family: 'Freestyle script';
   list-style: none;
   font-size: xx-large;
   text-decoration: none;
   top: 0;
   left: 0;
   width: 100%;
   padding: 20px 30px;
   z-index: 5;
   display: flex;
   align-items: center;
   justify-content: space-between;
  
   #toggle{
      display: none;
   }

   @media screen and (max-width: 600px) {
      margin: 15px 0px;
      padding: 15px 15px;
      #toggle{
      position:relative;
      display: block;
   }  
   }

   @media screen and (max-width: 992px){
      margin: 15px 0px;
      padding: 15px 15px;
      #toggle{
      position:relative;
      display: block;
   } 
   }
`

export const List = styled.li`
     font-size: medium;
     display: flex;
     font-family: 'Montserrat', sans-serif;;
     gap: 35px; 
     padding: 7px 10px;
     color: white;  

     #nan{
      text-decoration: none;
      color: white;
     }

     @media screen and (max-width: 600px) {
        display: none;
        #toggle{
        position:relative;
        display: block;
        float: right;
   }  
   }
    @media screen and (max-width: 992px){
      display: none;
      #toggle{
      position:relative;
      display: block;
      float: right;
   }  
   }
  
`
export const Div = styled.div`
   position: absolute;
   top: 60px;
   right: 30px;
  
   @media screen and (max-width: 600px) {
      margin: 7px 3px;
      padding: 15px 15px;
      #toggle{
      position:relative;
      display: block;
      float: right;
   }  
   }

   @media screen and (max-width: 992px){
      width: 90%;
      margin: 7px 3px;
      padding: 15px 15px;
      #toggle{
      position:relative;
      display: block;
      float: right;
   } 
   }

`
export const HamList = styled.li`
   display: flex;
   flex-direction: column;
   display: none;
   height: 300px;
  
  

   @media screen and (max-width: 600px){
      background-color: #a19a9a;
      flex-direction: column;
      height: fit-content;
      color: red;
      display: flex;
      text-align: center;
      gap: 3px;
      margin: 10px 5px;
      padding: 15px 15px;
      z-index: 1;
      width: 100%;
      height: 300px;

      #nav-link {
      color: white;
    }

     a{
       float: none;
         display: block;
         text-align: ri;
    }
    #nan{
      text-decoration: none;
      color: white;
    }
    
  }
   
    @media screen and (max-width: 992px){
      background-color: #a19a9a;
      flex-direction: column;
      height: fit-content;
      color: red;
      display: flex;
      text-align: center;
      gap: 3px;
      margin: 10px 5px;
      padding: 15px 15px;
      z-index: 1;
      width: 100%;
      height: 300px;

      #nav-link {
      color: white;
    }

     a{
       float: none;
         display: block;
         text-align: ri;
    }
    #nan{
      text-decoration: none;
      color: white;
    }
  }
`

export const Nav_Link = styled.a`
   padding: 5px 15px;
   margin-top: -5px;
   text-decoration: none;
   border: 2px solid green;
   border-radius: 8px;
   border-color: white;
   color: white;
  
`

export const Desc = styled.div`
   font-family: 'Montserrat Alternates', sans-serif;
   font-size: 30px;
   font-weight: 500px;
   display: flex;
   justify-content: left;
   align-items: center;
   padding: 5px 50px;
   margin-top: 70px;

   // ==== start of animation ===== //
   h1{
      position: relative;
      animation-name: example;
      animation-duration: 8s;
      animation-delay: 2s;
      animation-iteration-count: infinite;
   }

  @keyframes example {
  0%   { left:0px; top:0px;}
  25%  { left:800px; top:0px;}
  /* 50%  { left:200px; top:200px;} */
  /* 75%  { left:0px; top:200px;} */
  100% { left:0px; top:0px;}
   }
   // ==== end of  naimation ====//

   p{
      margin-top: 35px;
      font-size: 20px;
      font-family: 'Montserrat Alternates', sans-serif;
   }
   button{
     margin-top: 35px;
     background-color: inherit;
     border: 2px solid green;
     border-radius: 8px;
     border-color: white;
     color: white;
     padding: 12px 16px;
   }

   @media screen and (max-width: 600px){
      flex-direction: column;
      height: fit-content;
      width: 90%;
      font-size:20px;
      margin: 15px 0px;
      padding: 15px 15px;
  }
   
    @media screen and (max-width: 992px){
      flex-direction: column;
      height: fit-content;
      width: 90%;
      margin: 15px 0px;
      padding: 15px 15px;
  }

`
/* ======================== Header Styles Ends here ====================== */
/* ======================== AboutUs Styles Starts Here ====================== */

export const AboutUs = styled.div`
    margin-bottom: 10px;
    color: black;
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 500%;
    min-height: 7vh;
    padding: 30px 50px;
    .ab{
      margin-bottom: 50px;
    }

    @media screen and (max-width: 600px){
      display: flex;
      flex-direction: column;
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-direction: column;
   }
   
`
export const AllText = styled.div`
  display: flex;
  flex-direction: column;

  button{
   width: 236px;
   margin: 20px auto;
   border-radius: 8px;
   padding: 16px;
   color: #101828;
   background: none;
  }

  @media screen and (max-width: 600px){
   display: flex;
   flex-direction: column;
}

 @media screen and (max-width: 992px){
   display: flex;
   flex-direction: column;
}

`
export const Text = styled.div`
   display: flex;
   justify-content: space-around;


   @media screen and (max-width: 600px){
      display: flex;
      flex-direction: column;
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-direction: column;
   }
`
export const Auction = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: left;
   gap: 10px;
   h4{
      margin-bottom: 5px;
   }

   #auc-id{
      margin-top: -3px;
   }
   
`
export const Direct = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: left;
   gap: 10px;
   h4{
      margin-bottom: 5px;
   }

   #dir-id{
      margin-top: -3px;
   }
`
export const ArtWork = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: left;
   gap: 10px;
   h4{
      margin-bottom: 5px;
   }

   #art-id{
      margin-top: -3px;
   }
`

/* ======================== About Styles ends here ====================== */
/* ======================== Gallery Styles starts here ====================== */

export const AGallery = styled.div`
     font-family: 'Montserrat Alternates', sans-serif;
    
     margin-bottom: 40px;
     min-height: 100vh;
     padding: 60px;
     width: 1,231px;

     h2{
      text-decoration: underline;
      margin-bottom: 20px;
      display: flex;
      align-items: center; 
     }

     button{
      display: flex;
      align-items: center; 
      width: 236px;
      margin: auto;
      border-radius: 8px;
      padding: 16px 60px;
      color: #101828;
      background: none;
  }

  @media screen and (max-width: 600px){
      flex-direction: column;
      width: 90%;
      margin: 15px 0px;
      padding: 15px 15px;
  
}

 @media screen and (max-width: 992px){
     flex-direction: column;
     width: 90%;
     margin: 15px 0px;
     padding: 15px 15px;
}
`


export const GridCol = styled.div`
    display: inline-grid;
    gap: 10px;
    grid-template-areas: 
    'a b c'
    'a b d'
    'a e f';
    width: 100%;
    #uid{
      height: 500%;
   }

    @media screen and (max-width: 600px){
      display: flex;
      flex-wrap: wrap;
      width: 100%;
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-wrap: wrap;
       width: 100%;
   }

`
export const GridGap1 = styled.div`
   height: 80%;

   img{
     height: auto;
     width: 100%;
  } 
 
  @media screen and (max-width: 600px){
   display: flex;
   flex-wrap: wrap;
   width: 100%;
}

 @media screen and (max-width: 992px){
   display: flex;
   flex-wrap: wrap;
   width: 100%;
 }
`
export const GridGap2 = styled.div`
   height: 80%;
   
   img{
      width: 100%; 
   }
@media screen and (max-width: 600px){
   display: flex;
   flex-wrap: wrap;
   width: 100%;
}

 @media screen and (max-width: 992px){
   display: flex;
   flex-wrap: wrap;
   width: 100%;
 }
`

/* ======================== Gallery Styles ends here ====================== */
/* ======================== Footer Styles Starts here ====================== */
export const AllFoot = styled.div`
   font-family: 'Montserrat Alternates', sans-serif;
   width: 90%;
   margin: 20px 70px;
   display: flex;
   justify-content: space-between;
   text-align: center;
   gap: 10px;
   

   @media screen and (max-width: 600px){
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30px;
   }
`
export const Newslatter = styled.div`
    margin-top: -30px;
    padding-top: 0%;
    display: flex;
    flex-direction: column;
    text-align: left;
    line-height: -50px;

    .nL{
      margin-bottom: 10px;
    }
    
   input{
      width: 69%;
      height: 120%;
      border-radius: 8;
   }
   button{
      height: 150%;
   }

   @media screen and (max-width: 600px){
      display: flex;
      flex-wrap: wrap;
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-wrap: wrap;
   }
   
`
export const Foot = styled.div`
      gap: 20px;
     
  h2{
   font-family: 'Freestyle script';
   margin-bottom: 10px;
  }
  #nan{
      list-style: none;
      color: black;
   }
`
export const HList = styled.li`
      display: flex;
      flex-direction: column;
      list-style: none;
      color: black;
      gap: 20px;

     a{
      text-decoration: none;
     }
     .hom{
      display: flex;
      gap: 30px;
     }
     .gal{
      display: flex;
      gap: 20px;
     }
 
`
export const Flex = styled.div`
    line-height: normal;
    gap: 1%;
    @media screen and (max-width: 600px){
      margin-top: auto;
   }
   
    @media screen and (max-width: 992px){
      margin-top: auto;
   }
`
export const Locate = styled.div`
   display: flex;
   flex-direction: column;
   margin-top: 15px;
   padding: -2px 5px;

   
   @media screen and (max-width: 600px){
      display: flex;
      flex-direction: column;
      font-size: small;
      
   }
   
    @media screen and (max-width: 992px){
      display: flex;
      flex-direction: column;
   }
`
/* ===================== Footer Styles ends here ============= */
/* ======================== Global Styles ====================== */

