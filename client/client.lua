local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
  SendReactMessage('redm-anim-player:toggleModal', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)


function LoadAnimationDic(dict)
  if not HasAnimDictLoaded(dict) then
      RequestAnimDict(dict)
      while not HasAnimDictLoaded(dict) do
          Citizen.Wait(0)
      end
  end
end

RegisterNUICallback('anim-player:play', function(data, cb)
  LoadAnimationDic(data.animDict)
  TaskPlayAnim( PlayerPedId(), data.animDict, data.animName, 2.0, 0, -1, 1, 0, 0, 0, 0)
-- TaskPlayAnim( PlayerPedId(), data.animDict, data.animName, data.blendInSpeed, data.blendOutSpeed, data.duration, data.flag, data.playbackRate, data.lockX, data.lockY, data.lockZ
  cb({})
end)