require("dotenv").config
const Bot=require('node-telegram-bot-api');
const {
    INPUT_STATUS: ipstatus,
    INPUT_TOKEN: tgtoken,
    INPUT_CHAT: chatid,
    INPUT_IU_TITLE: ititle,
    INPUT_IU_NUM: inum,
    INPUT_IU_ACTOR: iactor,
    INPUT_IU_BODY: ibody,
    INPUT_PR_NUM: pnum,
    INPUT_PR_STATE: prstate,
    INPUT_PR_TITLE: ptitle,
    INPUT_PR_BODY: pbody,
    GITHUB_EVENT_NAME: ghevent,
    GITHUB_REPOSITORY: repo,
    GITHUB_ACTOR: ghactor,
    GITHUB_SHA: sha,
    GITHUB_WORKFLOW: ghwrkflw
} = process.env;

const bot=new Bot(tgtoken)

const evresp = (gevent) => {
    switch (gevent) {

        case "issues":
            return `
Issue ${prstate} by \`${iactor}\`

[#${inum} ${ititle}](https://github.com/${repo}/issues/${inum})

*${ibody}*

_[${repo}](https://github.com/${repo}/)_`
        case "issue_comment":
            return `
Issue ${prstate} by \`${iactor}\`

[#${inum} ${ititle}](https://github.com/${repo}/issues/${inum})

Comment on #${inum} ${ititle}

\`${process.env.INPUT_IU_COM}\`

_[${repo}](https://github.com/${repo}/)_`
        case "pull_request":
            return `
Pull request ${prstate} by ${ghactor}
        
[#${pnum} ${ptitle}](https://github.com/${repo}/pull/${pnum})
        
*${pbody}*
        
_[${repo}](https://github.com/${repo}/)_
_[Build log](https://github.com/${repo}/commit/${sha}/checks)_
@the_man_who_sold @sergey_shopik @iBabuk
`
        case "watch":
            return `
By:            *${ghactor}* 
        
\`Repository:  ${repo}\` 
        
Star Count      ${process.env.INPUT_STARGAZERS}
        
Fork Count      ${process.env.INPUT_FORKERS}
        
[Link to Repo](https://github.com/${repo}/)
            `
        case "schedule":
            return `
ID: ${ghwrkflw}
        
Run *${ipstatus}!*
        
*Action was Run on Schedule*
        
\`Repository:  ${repo}\` 
        
_[${repo}](https://github.com/${repo}/)_
            `
        case "push":
            return `
*${ghevent}* on ${process.env.GITHUB_REF} by *${ghactor}* 

_[${repo}](https://github.com/${repo}/)_
`
        case "pull_request_review":
            return `
*${ghactor}* interact with [#${pnum} ${ptitle}](https://github.com/${repo}/pull/${pnum})

_[${repo}](https://github.com/${repo}/)_
`
        case "pull_request_review_comment":
            return `
*${ghactor}* [Comment on #${pnum} ${ptitle}](https://github.com/${repo}/pull/${pnum})

_[${repo}](https://github.com/${repo}/)_
            `
        default:
            return `
⬆️⇅⬆️⇅
        
Action was a *${ipstatus}!* by *${ghactor}* 
        
\`Repository:  [${repo}](https://github.com/${repo}/)\` 
        
On:          *${ghevent}*
        
Tag:        ${process.env.GITHUB_REF}
        
_[${repo}](https://github.com/${repo}/)_
            `
    }
}
const output = evresp(ghevent)
bot.sendMessage(chatid,output,{parse_mode : "Markdown"})