import SocialIcons from './socialIcons'

export default function getSocialList(url, title){
    return [
        {
            name: "Twitter",
            svg: SocialIcons.twitter,
            url: `https://twitter.com/intent/tweet?url=${url}&amp;text=${title}`
        },
        {
            name: "Facebook",
            svg: SocialIcons.facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`
        }
    ]
}
