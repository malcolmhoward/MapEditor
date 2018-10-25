class 'VanillaParser'

function VanillaParser:__init()
	print("Initializing VanillaParser")
end



function VanillaParser:OnPartitionLoaded(p_Partition)
	if p_Partition == nil then
		return
	end
	
	local s_Instances = p_Partition.instances

	local s_InstancesToReplace = {}
	for _, l_Instance in ipairs(s_Instances) do
		if l_Instance == nil then
			print('Instance is null?')
			goto continue
		end

		-- Catch all blueprints
		if(l_Instance.typeInfo.name == "ReferenceObjectData") then
			--local s_Instance = ReferenceObjectData(l_Instance)
			--s_Instance:MakeWritable()
--
			--s_Instance.blueprint = nil
			--print(s_Instance.instanceGuid)
		end

		::continue::
	end
	for i, v in pairs(s_InstancesToReplace) do
	end

end




function dump(o)
	if(o == nil) then
		print("tried to load jack shit")
	end
	if type(o) == 'table' then
		local s = '{ '
		for k,v in pairs(o) do
			 if type(k) ~= 'number' then k = '"'..k..'"' end
			 s = s .. '['..k..'] = ' .. dump(v) .. ','
		end
		return s .. '} '
	else
		return tostring(o)
	end
end

function Set (list)
	local set = {}
	for _, l in ipairs(list) do set[l] = true end
	return set
end

return VanillaParser()

