util.optsItemFilter=function(state)
{
	const
	exclude=[],
	{selected}=state.view

	if(selected.length!==1) exclude.push('edit') 

	return x=>!exclude.includes(x)
}
util.optsListFilter=()=>true
util.txt2txts=function(txt)
{
	return txt.split(config.newline)
			.filter(x=>x.length)
			.map(util.txtRepeat)
			.reduce(util.flatten,[])
}
util.txtRepeat=function(txt)
{
	const repeat=/X:\d+-\d+/

	if(!txt.match(repeat)) return [txt]

	const
	[replace]=txt.match(repeat),//X:11-2
	[min,max]=replace.split(':')[1]//11-2
			.split('-')//[11','2']
			.map(d=>parseInt(d))//[11,2]
			.sort((a,b)=>a-b)//[2,11]//sort() will keep 11 in front

	return Array(max-min+1)
			.fill(min)
			.map((d,i)=>d+i)
			.map(d=>txt.replace(repeat,d))
}
//generic
util.empty=txt=>!txt.replace(/\s/g,'').length
//useful when rerendering before array length is updated (e.g. pop/splice)
util.mapEmpty=(arr,fn)=>arr.filter(x=>!!x).map(fn)
util.rand=(max,min=1,seed=Math.random())=>Math.floor(seed*(max-min+1))
util.shuffle=function(arr)
{
	arr.map(()=>util.rand(arr.length-1,0))
	.forEach((j,i)=>[arr[i],arr[j]]=[arr[j],arr[i]])

	return arr
}