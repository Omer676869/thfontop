Option Explicit

Dim shell, http, player, isPlaying, soundFile, fso
Set shell = CreateObject("WScript.Shell")
Set http = CreateObject("MSXML2.XMLHTTP")
Set fso = CreateObject("Scripting.FileSystemObject")

' Use Windows temp folder for storing sound
soundFile = fso.GetSpecialFolder(2) & "\sound.mp3"

' Create WMP object
Set player = CreateObject("WMPlayer.OCX")
isPlaying = False

Do
    ' Request status silently
    http.open "GET", "https://thfontop.vercel.app/api/status", False
    http.send
    Dim response : response = http.responseText

    ' Check ready = yes
    If InStr(response, """ready"":""yes""") > 0 Then

        If Not isPlaying Then
            ' Download the sound file silently
            shell.Run "cmd /c curl -L ""https://dl.sndup.net/yv3kf/Epfn.mp3"" -o """ & soundFile & """", 0, True

            ' Play it
            player.URL = soundFile
            player.controls.play
            isPlaying = True
        End If

    ' Check ready = no
    ElseIf InStr(response, """ready"":""no""") > 0 Then

        If isPlaying Then
            player.controls.stop
            isPlaying = False
        End If

    End If

    ' Stay silent, just sleep
    WScript.Sleep 2000
Loop
