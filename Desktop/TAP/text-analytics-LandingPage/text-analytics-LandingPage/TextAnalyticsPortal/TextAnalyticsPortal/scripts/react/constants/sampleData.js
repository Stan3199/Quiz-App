﻿const sampleData = (() => {
    return {
        data:[{ "review": "Easy to navigate, no glitches" }, { "review": "the best product" }, { "review": "Very easy to understand and use the design lab!" }, { "review": "Due to the COVID 19 pandemic or Trump Plague I would not recommend a visit to any store at this time. My order was place on line for an item I have used before and new exactly was I was looking for. Otherwise, I would recommend a visit to the store after the Trump Plague passes in order to see whatever product is too be purchased." }, { "review": "quality products, and the warranty service has been outstanding" }, { "review": "store wont launch but its coo when it worked" }, { "review": "The information provided pre-purchase is clear and concise.  The purchase experience is simple and direct especially when using your   Online User ID." }, { "review": "QUICK AND EASY" }, { "review": "Price is far too high." }, { "review": "I find it very easy to use." }, { "review": "You tell people to click on things that do not show up on what opens following your dismal inacurate instructions. I can't find ways of fixing problems which are many with this windows 10 turd." }, { "review": "It's always quick and easy to make purchases through the   store." }, { "review": "Easy to navigate.Has all the information you need. Nice to get a student discount." }, { "review": "Love your products." }, { "review": "Easy to purchase. Reliable." }, { "review": "i was directed to open the list next to profile then click on \"MyLibrary\" EXCEPT my lib does not appear on my list. Everything i have purchase is lost ????" }, { "review": "The ease of the experience." }, { "review": "The pricing is ok but the dates of delivery is confusing. Please only list one date !" }, { "review": "The \"talk with an expert\" button did not work. I called the phone number and the person who answered was not helpful. Very strong accent and I couldn't understand her name. I asked her a question and she continued to read the script. I asked if I should talk with someone else about my questions. She said yes and bye." }, { "review": "Great response from agents and calls when I need something answered.  Easy for me to navigate the browser.  Great program" }, { "review": "good" }, { "review": "mMy wife, 2 daughters and my granddaughter have Surface Pros and they love them. I buying this for my 93 year old mother who used my wife's today and thought it was great." }, { "review": "Fast,  responsive, easy to navigate" }, { "review": "I'm upgrading to windows 10, but had to add the new explorer to be able to get the software added to my cart.  It has taken me almost 1 hour to just but the software.  VERY frustrated." }, { "review": "Easily found what I was looking for, an overall easy and quick process to find and purchase the game." }, { "review": "I loved shopping on   Store! It was easy to find what I wanted and liked all the options offered on the product I was searching for. All in all my experience was top notch!" }, { "review": "  has many features and apps. its very easy to download because it takes you through every step" }, { "review": "  365 is a fantastic product. It is very easy to use." }, { "review": "Very easy to find what I was looking for." }, { "review": "Simple, easy, nothing unnecessary" }, { "review": "It's impossible to sign in to get apps from the store, the login window is blank, the only thing is clickable is a continue button which doesn't lead anywhere." }, { "review": "There are some rough edges with the Dell Bundles. I should be able to add, not just remove, items to the bundle from the cart. An edit of the bundle would probably meet this ac fine." }, { "review": "being able to customize your own controller with xbox is an easy way to get exactly what you want. i recommend that the metallic and camo options on controllers get more color options, a controller with a camo red body and all metallic gold buttons would be nice :)" }, { "review": "It was a fun experience (for my children and me) to design our own Xbox One wireless controllers. It was easy, straightforward, and enjoyable." }, { "review": "It's an easy way to by   products" }, { "review": "Pretty easy order process." }, { "review": "I don't like to shop at all, and would not recommend shopping to others for anything." }, { "review": "I updated a change of road name on my billing address (not a change of address - the road on my billing address was renamed by the city).  The change didn't appear to take and now I'm not sure if the transaction will go through." }, { "review": "It not that easy" }, { "review": "The website is fairly easy to use and everything is presented in a very well-organized and aesthetically pleasing way." }, { "review": "Ease of use" }, { "review": "I have always trusted  ." }, { "review": "I ordered Win10 to download and when I check out it says it will be delivered in 3 to 5 business days.  WHAT happened to me being able to download it!" }, { "review": "Easy to use, I feel secure with Windows Hello integration." }, { "review": "try to open the viewer i just got in ms store, but i keep getting a message that the store can't open due to no internet,  the feedback hub will not open either." }, { "review": "Easy to browse and order!" }, { "review": "I have a license on my old laptop.  There was no way to input the license number into the new computer.  Instead, I had to pya again for something I already own." }, { "review": "The customer service representative tried to help resolve my problem.  When he could not, he transferred me to technical support.  That representative was able to resolve my issue.  Both of these men were very polite and helpful.  I apppreciaate both of them." }, { "review": "I already renewed this and I certainly hope I don't get charged twice." }, { "review": "I don't like the fact you guys force someone to subscribe. Its a great deal but I would rather pay a little more and keep vs every year pay $53" }, { "review": "I am very pleased with my purchase. Thank you very much!   Ms. Denise Thompkins" }, { "review": "Nice" }, { "review": "bought office for my pc, then upon starting, hadn't entered product key and yet I get message product key already been used, called customer service and you are closed with no mention of hours you are open, how am I supposed to work if I need to wait a day" }, { "review": "Ironically, I could not complete my order on Edge. Had to switch to Chrome!" }, { "review": "I love xbox and  " }, { "review": "The only thing I could say to make it better is show before you click on a item if it's in stock or not. Other than that I love it all super easy and very detailed information on the products." }, { "review": "it's a simple process" }, { "review": "1. I do not recommend commercial products to others. 2. Your website is unclear as to what I am buying.  I used chat to confirm that I am buying access to support up to 5 devices.  I overpaid last year because this wasn't clear. 3. Product purchase requires automatic renewal.  I understand that I may go into my account and change that after purchase, but you should permit either automatic renewal or manual renewal as options at time of purchase. For these reasons and more, I will not recommend your products." }, { "review": "It just works for me." }, { "review": "Easy to use. Want prices displayed before placing in cart." }, { "review": "The process to get what I needed was seamless and quick." }, { "review": "Good prices good products" }, { "review": "bfweogJXBFU9GCHBWEUOBOuiwehroshe" }, { "review": "I like and trust  ." }, { "review": "Obtain console, direct from source !" }, { "review": "I think you should have a higher discount for teachers and students who are purchasing computers, surface books, etc." }, { "review": "Please be more price competitive is all I say to take into consideration, to gain a bigger share of the market. But overall, love the store and products you produce!" }, { "review": "I purchased Office 365 Family from the HUP program because of the employee discount and my order Thank You page says my subscription renews at $69.99 (Order# 7286127477) but my account subscriptions page says that I will be charged the regular $99.99 every year.  Which is it and how do I get it updated on my subscription?" }, { "review": "Quick and easy process" }, { "review": "Product selection was good but found the ordering process confusing." }, { "review": "Super easy to navigate your store and find any product I'm interested in. Purchasing was also a breeze and essentially required a single-click." }, { "review": "The purchase was straight forward and without a problem" }, { "review": "The system made it difficult for me to purchase and it looks like it sent my purchase to an email I no longer have, one which I'd updated on both my xbox and my computer previously." }, { "review": "Xbox/  is the superior brand/console. God bless." }, { "review": "Having both physical and virtual stores is perfect.  We checked out the devices in store, and purchased online after decision was made." }, { "review": "Easy to access and not that hard to find what you're looking for. 10/10 would do again." }, { "review": "  Store doesn't start on my laptop" }, { "review": "I had to re-image my computer because movies and tv stopped working for all files.  now I can't re-install it (movies and tv -- I have also lost all other windows store apps) without linking my machine to a live account.  I don't want to link everything I do to a Account.  I'm going to buy an apple for my next computer because of this bullshit." }]
    };
})();

export default sampleData;