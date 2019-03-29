//@todo add generic progress bar
output.desc=(state,item)=>v('span.desc',{},item.text)
output.header=function(state)
{
	const
	headerType=	logic.mode(state)==='move'?'optsMove':
				!state.view.selected.length?'optsList':
				'optsItem',
	btns=output[headerType](state),
	mode=logic.mode(state),
	back=mode==='move'||logic.path(state).filter(x=>!!x).length>1

	return v('header',{data:{back},on:{pointerup:curry(input,state)}},...btns)
}
output.icon=(state,item)=>v('button.icon',{data:{pointerup:'toggleSelect'}},'+')
output.item=function(state,opened,id,i,arr)
{
	const
	item=state.file.data[id],
	//@todo id attr could be an issue if child can have multiple parents 
		//& thus show up multiple times
	attrs={data:{pointerup:'open'},id},
	attrsDesc={data:{},on:{}}

	if(id===opened) attrs.data.opened=true

	if(id===state.view.edit)
	{
		attrsDesc.contenteditable=true
		attrsDesc.on.render=({target})=>target.focus()
		attrsDesc.on.blur=evt=>input.blur(state,evt)
	}
	else if(state.view.selected.includes(id)) attrs.data.selected=true

	return v('li',attrs,
		output.icon(state,item),
		output.desc(state,item)
	)
}
output.list=function(state,filter,id,i,opened)
{
	const
	item=state.file.data[id],
	nextOpen=opened[i+1],
	items=	item.list
			.filter(x=>!!x)
			.filter(filter)
			.map(curry(output.item,state,nextOpen))

	return v('ul',{},...items)
}
output.optsItem=function(state)
{
	return config.header.item
	.filter(util.optsItemFilter(state))
	.map(act=>v('button',{data:{pointerup:act}},act))
}
output.optsList=function(state)
{
	const
	placeholder=logic.path(state)
				.filter(x=>!!x)
				.slice(1)
				.map(id=>state.file.data[id].text)
				.join('/')+'/ (search)'

	return config.header.list
	.filter(util.optsListFilter(state))
	.map(function(x)
	{
		return x!=='search'?v('button',{data:{pointerup:x}},x):
		v('input.search',{placeholder,type:'text'})
	})
}
output.render=function({state})
{
	const
	move=state.view.move.filter(x=>!!x),
	[pointerup,mkList]=[input,output.list].map(fn=>util.curry(fn,state)),
	[path,filter]=	move.length?[move,id=>!state.view.selected.includes(id)]:
					[state.view.path,()=>true],
	lists=path.filter(x=>!!x).map(util.curry(mkList,filter)),
	main=v('main',{data:{view:state.view.layout},on:{pointerup}},...lists)

	return [output.header(state),main]
}