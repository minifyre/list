config.item={text:'',list:[]}
config.header=
{
	item:'delete,move,deselect,edit'.split(','),
	list:'opts,back,search,add'.split(',')
}
config.state=
{
	file:
	{
		meta:{},
		data:{}
	},
	view:
	{
		edit:'',
		layout:'list',
		move:[],
		path:['index'],
		selected:[],
		type:'list'
	}
}
config.style=`
:root /*variables*/
{
	--border:1px;/*@todo find a better rem-based measure*/
	--height:1.5rem;
	--margin:0.2rem;
}
/*fonts*/
@font-face 
{
	font-family:'icons';
	src:url('icons.ttf') format('truetype');
	font-weight:normal;
	font-style:normal;
	unicode-range:U+E000–U+F8FF;
}
/*resets*/
*
{
	box-sizing:border-box;
}
[disabled]
{
	filter:grayscale(100%);
	opacity:0.5;
}
html,
body
{
	background:#222;
	margin:0;
	padding:0;
}
main,
header
{
	/*@todo have js detect if there is a light theme
	and then divide text color into .dark & .light 
	& apply classes to main and header*/
	color:#fff;
	display:flex;
	flex-direction:row;
	min-height:var(--height);
	width:100%;
}
input,
button
{
	align-items:center;
	background-color:transparent;
	border:0;
	color:#fff;
	display:flex;
	font-family:'icons', Arial, sans-serif;
	height:var(--height);
	min-width:var(--height);
}
button
{
	justify-content:center;
}
/*layout defaults*/
.stretch{flex:1 1 auto;}
.shrink{flex:0 0 auto;}
/*lists*/
[data-view="list"] ul
{
	list-style:none;
	margin:0;
	padding:0;
}
header,
[data-view="list"] li
{
	align-items:center;
	background:#f8f8f8;
	display:flex;
	height:var(--height);
	position:relative;
}
header::after,
[data-view="list"] li::after
{
	background-color:#222;
	bottom:0;
	content:"";
	height:var(--border);
	position:absolute;
	width:100%;
}
/*@todo allow on bigger screens */
[data-back="true"] [data-pointerup="opts"]{display:none;}
[data-back="false"] [data-pointerup="back"]{display:none;}
.search
{
	background:transparent;
	/*icon font distorts url text*/
	font-family:Arial, Helvetica, sans-serif;
	flex:1 1 auto;
	padding:0 var(--margin);
	opacity:0.5;
}
.search::placeholder
{
	color:#fff;
}

.icon
{
	background:transparent;
	border-right:1px solid #222;
	height:100%;
	max-width:var(--height);
}
.desc
{
	color:#222;
	flex:1 1 auto;
	padding:0 var(--margin);
	min-height:100%;
}
/*item states*/
[data-completed]
{
	text-decoration:line-through;
}
[data-opened]
{
	font-weight:bold;
}
[data-selected]
{
	text-decoration:underline;
}`