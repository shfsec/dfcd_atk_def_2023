export default [`<?xml version="1.0" encoding="UTF-8" ?>
<class name="AABB" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="../class.xsd">
	<brief_description>
		A 3D axis-aligned bounding box.
	</brief_description>
	<description>
		[AABB] consists of a position, a size, and several utility functions. It is typically used for fast overlap tests.
		It uses floating-point coordinates. The 2D counterpart to [AABB] is [Rect2].
		Negative values for [member size] are not supported and will not work for most methods. Use [method abs] to get an AABB with a positive size.
		[b]Note:[/b] Unlike [Rect2], [AABB] does not have a variant that uses integer coordinates.
	</description>
	<tutorials>
		<link title="Math documentation index">$DOCS_URL/tutorials/math/index.html</link>
		<link title="Vector math">$DOCS_URL/tutorials/math/vector_math.html</link>
		<link title="Advanced vector math">$DOCS_URL/tutorials/math/vectors_advanced.html</link>
	</tutorials>
	<constructors>
		<constructor name="AABB">
			<return type="AABB" />
			<description>
				Constructs a default-initialized [AABB] with default (zero) values of [member position] and [member size].
			</description>
		</constructor>
		<constructor name="AABB">
			<return type="AABB" />
			<param index="0" name="from" type="AABB" />
			<description>
				Constructs an [AABB] as a copy of the given [AABB].
			</description>
		</constructor>
		<constructor name="AABB">
			<return type="AABB" />
			<param index="0" name="position" type="Vector3" />
			<param index="1" name="size" type="Vector3" />
			<description>
				Constructs an [AABB] from a position and size.
			</description>
		</constructor>
	</constructors>
	<methods>
		<method name="abs" qualifiers="const">
			<return type="AABB" />
			<description>
				Returns an AABB with equivalent position and size, modified so that the most-negative corner is the origin and the size is positive.
			</description>
		</method>
		<method name="encloses" qualifiers="const">
			<return type="bool" />
			<param index="0" name="with" type="AABB" />
			<description>
				Returns [code]true[/code] if this [AABB] completely encloses another one.
			</description>
		</method>
		<method name="expand" qualifiers="const">
			<return type="AABB" />
			<param index="0" name="to_point" type="Vector3" />
			<description>
				Returns a copy of this [AABB] expanded to include a given point.
				[b]Example:[/b]
				[codeblocks]
				[gdscript]
				# position (-3, 2, 0), size (1, 1, 1)
				var box = AABB(Vector3(-3, 2, 0), Vector3(1, 1, 1))
				# position (-3, -1, 0), size (3, 4, 2), so we fit both the original AABB and Vector3(0, -1, 2)
				var box2 = box.expand(Vector3(0, -1, 2))
				[/gdscript]
				[csharp]
				// position (-3, 2, 0), size (1, 1, 1)
				var box = new Aabb(new Vector3(-3, 2, 0), new Vector3(1, 1, 1));
				// position (-3, -1, 0), size (3, 4, 2), so we fit both the original AABB and Vector3(0, -1, 2)
				var box2 = box.Expand(new Vector3(0, -1, 2));
				[/csharp]
				[/codeblocks]
			</description>
		</method>
		<method name="get_center" qualifiers="const">
			<return type="Vector3" />
			<description>
				Returns the center of the [AABB], which is equal to [member position] + ([member size] / 2).
			</description>
		</method>
		<method name="get_endpoint" qualifiers="const">
			<return type="Vector3" />
			<param index="0" name="idx" type="int" />
			<description>
				Gets the position of the 8 endpoints of the [AABB] in space.
			</description>
		</method>
		<method name="get_longest_axis" qualifiers="const">
			<return type="Vector3" />
			<description>
				Returns the normalized longest axis of the [AABB].
			</description>
		</method>
		<method name="get_longest_axis_index" qualifiers="const">
			<return type="int" />
			<description>
				Returns the index of the longest axis of the [AABB] (according to [Vector3]'s [code]AXIS_*[/code] constants).
			</description>
		</method>
		<method name="get_longest_axis_size" qualifiers="const">
			<return type="float" />
			<description>
				Returns the scalar length of the longest axis of the [AABB].
			</description>
		</method>
		<method name="get_shortest_axis" qualifiers="const">
			<return type="Vector3" />
			<description>
				Returns the normalized shortest axis of the [AABB].
			</description>
		</method>
		<method name="get_shortest_axis_index" qualifiers="const">
			<return type="int" />
			<description>
				Returns the index of the shortest axis of the [AABB] (according to [Vector3]::AXIS* enum).
			</description>
		</method>
		<method name="get_shortest_axis_size" qualifiers="const">
			<return type="float" />
			<description>
				Returns the scalar length of the shortest axis of the [AABB].
			</description>
		</method>
		<method name="get_support" qualifiers="const">
			<return type="Vector3" />
			<param index="0" name="dir" type="Vector3" />
			<description>
				Returns the vertex of the AABB that's the farthest in a given direction. This point is commonly known as the support point in collision detection algorithms.
			</description>
		</method>
		<method name="get_volume" qualifiers="const">
			<return type="float" />
			<description>
				Returns the volume of the [AABB].
			</description>
		</method>
		<method name="grow" qualifiers="const">
			<return type="AABB" />
			<param index="0" name="by" type="float" />
			<description>
				Returns a copy of the [AABB] grown a given number of units towards all the sides.
			</description>
		</method>
		<method name="has_point" qualifiers="const">
			<return type="bool" />
			<param index="0" name="point" type="Vector3" />
			<description>
				Returns [code]true[/code] if the [AABB] contains a point. Points on the faces of the AABB are considered included, though float-point precision errors may impact the accuracy of such checks.
				[b]Note:[/b] This method is not reliable for [AABB] with a [i]negative size[/i]. Use [method abs] to get a positive sized equivalent [AABB] to check for contained points.
			</description>
		</method>
		<method name="has_surface" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the [AABB] has a surface or a length, and [code]false[/code] if the [AABB] is empty (all components of [member size] are zero or negative).
			</description>
		</method>
		<method name="has_volume" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the [AABB] has a volume, and [code]false[/code] if the [AABB] is flat, empty, or has a negative [member size].
			</description>
		</method>
		<method name="intersection" qualifiers="const">
			<return type="AABB" />
			<param index="0" name="with" type="AABB" />
			<description>
				Returns the intersection between two [AABB]. An empty AABB (size [code](0, 0, 0)[/code]) is returned on failure.
			</description>
		</method>
		<method name="intersects" qualifiers="const">
			<return type="bool" />
			<param index="0" name="with" type="AABB" />
			<description>
				Returns [code]true[/code] if the [AABB] overlaps with another.
			</description>
		</method>
		<method name="intersects_plane" qualifiers="const">
			<return type="bool" />
			<param index="0" name="plane" type="Plane" />
			<description>
				Returns [code]true[/code] if the [AABB] is on both sides of a plane.
			</description>
		</method>
		<method name="intersects_ray" qualifiers="const">
			<return type="Variant" />
			<param index="0" name="from" type="Vector3" />
			<param index="1" name="dir" type="Vector3" />
			<description>
				Returns the point of intersection of the given ray with this [AABB] or [code]null[/code] if there is no intersection. Ray length is infinite.
			</description>
		</method>
		<method name="intersects_segment" qualifiers="const">
			<return type="Variant" />
			<param index="0" name="from" type="Vector3" />
			<param index="1" name="to" type="Vector3" />
			<description>
				Returns the point of intersection between [param from] and [param to] with this [AABB] or [code]null[/code] if there is no intersection.
			</description>
		</method>
		<method name="is_equal_approx" qualifiers="const">
			<return type="bool" />
			<param index="0" name="aabb" type="AABB" />
			<description>
				Returns [code]true[/code] if this [AABB] and [param aabb] are approximately equal, by calling [method @GlobalScope.is_equal_approx] on each component.
			</description>
		</method>
		<method name="is_finite" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if this [AABB] is finite, by calling [method @GlobalScope.is_finite] on each component.
			</description>
		</method>
		<method name="merge" qualifiers="const">
			<return type="AABB" />
			<param index="0" name="with" type="AABB" />
			<description>
				Returns a larger [AABB] that contains both this [AABB] and [param with].
			</description>
		</method>
	</methods>
	<members>
		<member name="end" type="Vector3" setter="" getter="" default="Vector3(0, 0, 0)">
			Ending corner. This is calculated as [code]position + size[/code]. Setting this value will change the size.
		</member>
		<member name="position" type="Vector3" setter="" getter="" default="Vector3(0, 0, 0)">
			Beginning corner. Typically has values lower than [member end].
		</member>
		<member name="size" type="Vector3" setter="" getter="" default="Vector3(0, 0, 0)">
			Size from [member position] to [member end]. Typically, all components are positive.
			If the size is negative, you can use [method abs] to fix it.
		</member>
	</members>
	<operators>
		<operator name="operator !=">
			<return type="bool" />
			<param index="0" name="right" type="AABB" />
			<description>
				Returns [code]true[/code] if the AABBs are not equal.
				[b]Note:[/b] Due to floating-point precision errors, consider using [method is_equal_approx] instead, which is more reliable.
			</description>
		</operator>
		<operator name="operator *">
			<return type="AABB" />
			<param index="0" name="right" type="Transform3D" />
			<description>
				Inversely transforms (multiplies) the [AABB] by the given [Transform3D] transformation matrix.
			</description>
		</operator>
		<operator name="operator ==">
			<return type="bool" />
			<param index="0" name="right" type="AABB" />
			<description>
				Returns [code]true[/code] if the AABBs are exactly equal.
				[b]Note:[/b] Due to floating-point precision errors, consider using [method is_equal_approx] instead, which is more reliable.
			</description>
		</operator>
	</operators>
</class>`, `<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <!-- This file is read by XES, which we use in our Release builds. -->
  <PropertyGroup Label="Version">
    <XesUseOneStoreVersioning>true</XesUseOneStoreVersioning>
    <XesBaseYearForStoreVersion>2023</XesBaseYearForStoreVersion>
    <VersionMajor>1</VersionMajor>
    <VersionMinor>20</VersionMinor>
    <VersionInfoProductName>Windows Terminal</VersionInfoProductName>
  </PropertyGroup>
</Project>`, `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">
  <dependency>
    <dependentAssembly>
      <assemblyIdentity type="win32" name="Microsoft.Windows.Common-Controls" version="6.0.0.0" processorArchitecture="*" publicKeyToken="6595b64144ccf1df" language="*"/>
    </dependentAssembly>
  </dependency>
  <trustInfo xmlns="urn:schemas-microsoft-com:asm.v3">
    <security>
      <requestedPrivileges>
        <requestedExecutionLevel
          level="asInvoker"
          uiAccess="false"/>
      </requestedPrivileges>
    </security>
  </trustInfo>
  <compatibility xmlns="urn:schemas-microsoft-com:compatibility.v1"> 
    <application> 
      <!--The ID below indicates application support for Windows Vista --> 
        <supportedOS Id="{e2011457-1546-43c5-a5fe-008deee3d3f0}"/> 
      <!--The ID below indicates application support for Windows 7 --> 
        <supportedOS Id="{35138b9a-5d96-4fbd-8e2d-a2440225f93a}"/> 
      <!--The ID below indicates application support for Windows 8 --> 
        <supportedOS Id="{4a2f28e3-53b9-4441-ba9c-d69d4a4a6e38}"/> 
      <!--The ID below indicates application support for Windows 8.1 --> 
        <supportedOS Id="{1f676c76-80e1-4239-95bb-83d0f6d0da78}"/> 
      <!--The ID below indicates application support for Windows 10 --> 
        <supportedOS Id="{8e0f7a12-bfb3-4fe8-b9a5-48fd50a15a9a}"/> 
    </application> 
  </compatibility>
</assembly>`, `<?xml version="1.0" encoding="UTF-8"?>
<ui version="4.0">
 <class>Intro</class>
 <widget class="QDialog" name="Intro">
  <property name="geometry">
   <rect>
    <x>0</x>
    <y>0</y>
    <width>674</width>
    <height>447</height>
   </rect>
  </property>
  <property name="windowTitle">
   <string>Welcome</string>
  </property>
  <layout class="QVBoxLayout" name="verticalLayout">
   <item>
    <widget class="QLabel" name="welcomeLabel">
     <property name="styleSheet">
      <string notr="true">QLabel { font-style:italic; }</string>
     </property>
     <property name="text">
      <string>Welcome to %1.</string>
     </property>
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <spacer name="verticalSpacer_4">
     <property name="orientation">
      <enum>Qt::Vertical</enum>
     </property>
     <property name="sizeType">
      <enum>QSizePolicy::Minimum</enum>
     </property>
     <property name="sizeHint" stdset="0">
      <size>
       <width>20</width>
       <height>15</height>
      </size>
     </property>
    </spacer>
   </item>
   <item>
    <widget class="QLabel" name="storageLabel">
     <property name="text">
      <string>As this is the first time the program is launched, you can choose where %1 will store its data.</string>
     </property>
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <widget class="QLabel" name="sizeWarningLabel">
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <widget class="QRadioButton" name="dataDirDefault">
     <property name="text">
      <string>Use the default data directory</string>
     </property>
    </widget>
   </item>
   <item>
    <widget class="QRadioButton" name="dataDirCustom">
     <property name="text">
      <string>Use a custom data directory:</string>
     </property>
    </widget>
   </item>
   <item>
    <layout class="QHBoxLayout" name="horizontalLayout">
     <property name="spacing">
      <number>0</number>
     </property>
     <property name="sizeConstraint">
      <enum>QLayout::SetDefaultConstraint</enum>
     </property>
     <item>
      <spacer name="horizontalSpacer">
       <property name="orientation">
        <enum>Qt::Horizontal</enum>
       </property>
       <property name="sizeType">
        <enum>QSizePolicy::Fixed</enum>
       </property>
       <property name="sizeHint" stdset="0">
        <size>
         <width>60</width>
         <height>20</height>
        </size>
       </property>
      </spacer>
     </item>
     <item>
      <layout class="QVBoxLayout" name="verticalLayout_2">
       <property name="sizeConstraint">
        <enum>QLayout::SetDefaultConstraint</enum>
       </property>
       <item>
        <layout class="QHBoxLayout" name="horizontalLayout_2">
         <item>
          <widget class="QLineEdit" name="dataDirectory"/>
         </item>
         <item>
          <widget class="QPushButton" name="ellipsisButton">
           <property name="sizePolicy">
            <sizepolicy hsizetype="Minimum" vsizetype="Fixed">
             <horstretch>0</horstretch>
             <verstretch>0</verstretch>
            </sizepolicy>
           </property>
           <property name="maximumSize">
            <size>
             <width>30</width>
             <height>16777215</height>
            </size>
           </property>
           <property name="text">
            <string notr="true">…</string>
           </property>
           <property name="autoDefault">
            <bool>false</bool>
           </property>
          </widget>
         </item>
        </layout>
       </item>
       <item>
        <spacer name="verticalSpacer_3">
         <property name="orientation">
          <enum>Qt::Vertical</enum>
         </property>
         <property name="sizeType">
          <enum>QSizePolicy::Fixed</enum>
         </property>
         <property name="sizeHint" stdset="0">
          <size>
           <width>20</width>
           <height>5</height>
          </size>
         </property>
        </spacer>
       </item>
       <item>
        <widget class="QLabel" name="freeSpace">
         <property name="sizePolicy">
          <sizepolicy hsizetype="Preferred" vsizetype="Expanding">
           <horstretch>1</horstretch>
           <verstretch>0</verstretch>
          </sizepolicy>
         </property>
         <property name="text">
          <string/>
         </property>
         <property name="wordWrap">
          <bool>true</bool>
         </property>
        </widget>
       </item>
       <item>
        <spacer name="verticalSpacer_2">
         <property name="orientation">
          <enum>Qt::Vertical</enum>
         </property>
         <property name="sizeType">
          <enum>QSizePolicy::Fixed</enum>
         </property>
         <property name="sizeHint" stdset="0">
          <size>
           <width>20</width>
           <height>5</height>
          </size>
         </property>
        </spacer>
       </item>
       <item>
        <widget class="QLabel" name="errorMessage">
         <property name="sizePolicy">
          <sizepolicy hsizetype="Preferred" vsizetype="Expanding">
           <horstretch>0</horstretch>
           <verstretch>0</verstretch>
          </sizepolicy>
         </property>
         <property name="textFormat">
          <enum>Qt::RichText</enum>
         </property>
         <property name="wordWrap">
          <bool>true</bool>
         </property>
        </widget>
       </item>
      </layout>
     </item>
    </layout>
   </item>
   <item>
    <widget class="QLabel" name="lblExplanation1">
     <property name="text">
      <string>When you click OK, %1 will begin to download and process the full %4 block chain (%2 GB) starting with the earliest transactions in %3 when %4 initially launched.</string>
     </property>
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <widget class="QLabel" name="lblExplanation2">
     <property name="text">
      <string>This initial synchronisation is very demanding, and may expose hardware problems with your computer that had previously gone unnoticed. Each time you run %1, it will continue downloading where it left off.</string>
     </property>
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <widget class="QLabel" name="lblExplanation3">
     <property name="text">
      <string>If you have chosen to limit block chain storage (pruning), the historical data must still be downloaded and processed, but will be deleted afterward to keep your disk usage low.</string>
     </property>
     <property name="wordWrap">
      <bool>true</bool>
     </property>
    </widget>
   </item>
   <item>
    <layout class="QHBoxLayout" name="pruneOptLayout">
     <item>
      <widget class="QCheckBox" name="prune">
       <property name="text">
        <string>Limit block chain storage to</string>
       </property>
       <property name="toolTip">
        <string>Reverting this setting requires re-downloading the entire blockchain. It is faster to download the full chain first and prune it later. Disables some advanced features.</string>
       </property>
      </widget>
     </item>
     <item>
      <widget class="QSpinBox" name="pruneGB">
       <property name="suffix">
        <string> GB</string>
       </property>
      </widget>
     </item>
     <item>
      <widget class="QLabel" name="lblPruneSuffix">
       <property name="buddy">
        <cstring>pruneGB</cstring>
       </property>
      </widget>
     </item>
     <item>
      <spacer name="horizontalSpacer_2">
       <property name="orientation">
        <enum>Qt::Horizontal</enum>
       </property>
       <property name="sizeHint" stdset="0">
        <size>
         <width>40</width>
         <height>20</height>
        </size>
       </property>
      </spacer>
     </item>
    </layout>
   </item>
   <item>
    <spacer name="verticalSpacer">
     <property name="orientation">
      <enum>Qt::Vertical</enum>
     </property>
     <property name="sizeHint" stdset="0">
      <size>
       <width>20</width>
       <height>40</height>
      </size>
     </property>
    </spacer>
   </item>
   <item>
    <widget class="QDialogButtonBox" name="buttonBox">
     <property name="orientation">
      <enum>Qt::Horizontal</enum>
     </property>
     <property name="standardButtons">
      <set>QDialogButtonBox::Cancel|QDialogButtonBox::Ok</set>
     </property>
    </widget>
   </item>
  </layout>
 </widget>
 <resources/>
 <connections>
  <connection>
   <sender>buttonBox</sender>
   <signal>accepted()</signal>
   <receiver>Intro</receiver>
   <slot>accept()</slot>
   <hints>
    <hint type="sourcelabel">
     <x>20</x>
     <y>20</y>
    </hint>
    <hint type="destinationlabel">
     <x>20</x>
     <y>20</y>
    </hint>
   </hints>
  </connection>
  <connection>
   <sender>buttonBox</sender>
   <signal>rejected()</signal>
   <receiver>Intro</receiver>
   <slot>reject()</slot>
   <hints>
    <hint type="sourcelabel">
     <x>20</x>
     <y>20</y>
    </hint>
    <hint type="destinationlabel">
     <x>20</x>
     <y>20</y>
    </hint>
   </hints>
  </connection>
 </connections>
</ui>`, `<?xml version="1.0" encoding="UTF-8" ?>
<class name="Node" inherits="Object" version="4.0">
	<brief_description>
		Base class for all [i]scene[/i] objects.
	</brief_description>
	<description>
		Nodes are Godot's building blocks. They can be assigned as the child of another node, resulting in a tree arrangement. A given node can contain any number of nodes as children with the requirement that all siblings (direct children of a node) should have unique names.
		A tree of nodes is called a [i]scene[/i]. Scenes can be saved to the disk and then instantiated into other scenes. This allows for very high flexibility in the architecture and data model of Godot projects.
		[b]Scene tree:[/b] The [SceneTree] contains the active tree of nodes. When a node is added to the scene tree, it receives the [constant NOTIFICATION_ENTER_TREE] notification and its [method _enter_tree] callback is triggered. Child nodes are always added [i]after[/i] their parent node, i.e. the [method _enter_tree] callback of a parent node will be triggered before its child's.
		Once all nodes have been added in the scene tree, they receive the [constant NOTIFICATION_READY] notification and their respective [method _ready] callbacks are triggered. For groups of nodes, the [method _ready] callback is called in reverse order, starting with the children and moving up to the parent nodes.
		This means that when adding a node to the scene tree, the following order will be used for the callbacks: [method _enter_tree] of the parent, [method _enter_tree] of the children, [method _ready] of the children and finally [method _ready] of the parent (recursively for the entire scene tree).
		[b]Processing:[/b] Nodes can override the "process" state, so that they receive a callback on each frame requesting them to process (do something). Normal processing (callback [method _process], toggled with [method set_process]) happens as fast as possible and is dependent on the frame rate, so the processing time [i]delta[/i] (in seconds) is passed as an argument. Physics processing (callback [method _physics_process], toggled with [method set_physics_process]) happens a fixed number of times per second (60 by default) and is useful for code related to the physics engine.
		Nodes can also process input events. When present, the [method _input] function will be called for each input that the program receives. In many cases, this can be overkill (unless used for simple projects), and the [method _unhandled_input] function might be preferred; it is called when the input event was not handled by anyone else (typically, GUI [Control] nodes), ensuring that the node only receives the events that were meant for it.
		To keep track of the scene hierarchy (especially when instancing scenes into other scenes), an "owner" can be set for the node with the [member owner] property. This keeps track of who instantiated what. This is mostly useful when writing editors and tools, though.
		Finally, when a node is freed with [method Object.free] or [method queue_free], it will also free all its children.
		[b]Groups:[/b] Nodes can be added to as many groups as you want to be easy to manage, you could create groups like "enemies" or "collectables" for example, depending on your game. See [method add_to_group], [method is_in_group] and [method remove_from_group]. You can then retrieve all nodes in these groups, iterate them and even call methods on groups via the methods on [SceneTree].
		[b]Networking with nodes:[/b] After connecting to a server (or making one, see [ENetMultiplayerPeer]), it is possible to use the built-in RPC (remote procedure call) system to communicate over the network. By calling [method rpc] with a method name, it will be called locally and in all connected peers (peers = clients and the server that accepts connections). To identify which node receives the RPC call, Godot will use its [NodePath] (make sure node names are the same on all peers). Also, take a look at the high-level networking tutorial and corresponding demos.
	</description>
	<tutorials>
		<link title="Scenes and nodes">https://docs.godotengine.org/en/latest/getting_started/step_by_step/scenes_and_nodes.html</link>
		<link title="All Demos">https://github.com/godotengine/godot-demo-projects/</link>
	</tutorials>
	<methods>
		<method name="_enter_tree" qualifiers="virtual">
			<return type="void" />
			<description>
				Called when the node enters the [SceneTree] (e.g. upon instancing, scene changing, or after calling [method add_child] in a script). If the node has children, its [method _enter_tree] callback will be called first, and then that of the children.
				Corresponds to the [constant NOTIFICATION_ENTER_TREE] notification in [method Object._notification].
			</description>
		</method>
		<method name="_exit_tree" qualifiers="virtual">
			<return type="void" />
			<description>
				Called when the node is about to leave the [SceneTree] (e.g. upon freeing, scene changing, or after calling [method remove_child] in a script). If the node has children, its [method _exit_tree] callback will be called last, after all its children have left the tree.
				Corresponds to the [constant NOTIFICATION_EXIT_TREE] notification in [method Object._notification] and signal [signal tree_exiting]. To get notified when the node has already left the active tree, connect to the [signal tree_exited].
			</description>
		</method>
		<method name="_get_configuration_warnings" qualifiers="virtual">
			<return type="String[]" />
			<description>
				The elements in the array returned from this method are displayed as warnings in the Scene Dock if the script that overrides it is a [code]tool[/code] script.
				Returning an empty array produces no warnings.
				Call [method update_configuration_warnings] when the warnings need to be updated for this node.
			</description>
		</method>
		<method name="_input" qualifiers="virtual">
			<return type="void" />
			<argument index="0" name="event" type="InputEvent" />
			<description>
				Called when there is an input event. The input event propagates up through the node tree until a node consumes it.
				It is only called if input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_input].
				To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
				For gameplay input, [method _unhandled_input] and [method _unhandled_key_input] are usually a better fit as they allow the GUI to intercept the events first.
				[b]Note:[/b] This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
			</description>
		</method>
		<method name="_physics_process" qualifiers="virtual">
			<return type="void" />
			<argument index="0" name="delta" type="float" />
			<description>
				Called during the physics processing step of the main loop. Physics processing means that the frame rate is synced to the physics, i.e. the [code]delta[/code] variable should be constant. [code]delta[/code] is in seconds.
				It is only called if physics processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_physics_process].
				Corresponds to the [constant NOTIFICATION_PHYSICS_PROCESS] notification in [method Object._notification].
				[b]Note:[/b] This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
			</description>
		</method>
		<method name="_process" qualifiers="virtual">
			<return type="void" />
			<argument index="0" name="delta" type="float" />
			<description>
				Called during the processing step of the main loop. Processing happens at every frame and as fast as possible, so the [code]delta[/code] time since the previous frame is not constant. [code]delta[/code] is in seconds.
				It is only called if processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process].
				Corresponds to the [constant NOTIFICATION_PROCESS] notification in [method Object._notification].
				[b]Note:[/b] This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
			</description>
		</method>
		<method name="_ready" qualifiers="virtual">
			<return type="void" />
			<description>
				Called when the node is "ready", i.e. when both the node and its children have entered the scene tree. If the node has children, their [method _ready] callbacks get triggered first, and the parent node will receive the ready notification afterwards.
				Corresponds to the [constant NOTIFICATION_READY] notification in [method Object._notification]. See also the [code]onready[/code] keyword for variables.
				Usually used for initialization. For even earlier initialization, [method Object._init] may be used. See also [method _enter_tree].
				[b]Note:[/b] [method _ready] may be called only once for each node. After removing a node from the scene tree and adding again, [code]_ready[/code] will not be called for the second time. This can be bypassed with requesting another call with [method request_ready], which may be called anywhere before adding the node again.
			</description>
		</method>
		<method name="_unhandled_input" qualifiers="virtual">
			<return type="void" />
			<argument index="0" name="event" type="InputEvent" />
			<description>
				Called when an [InputEvent] hasn't been consumed by [method _input] or any GUI. The input event propagates up through the node tree until a node consumes it.
				It is only called if unhandled input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_input].
				To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
				For gameplay input, this and [method _unhandled_key_input] are usually a better fit than [method _input] as they allow the GUI to intercept the events first.
				[b]Note:[/b] This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
			</description>
		</method>
		<method name="_unhandled_key_input" qualifiers="virtual">
			<return type="void" />
			<argument index="0" name="event" type="InputEventKey" />
			<description>
				Called when an [InputEventKey] hasn't been consumed by [method _input] or any GUI. The input event propagates up through the node tree until a node consumes it.
				It is only called if unhandled key input processing is enabled, which is done automatically if this method is overridden, and can be toggled with [method set_process_unhandled_key_input].
				To consume the input event and stop it propagating further to other nodes, [method Viewport.set_input_as_handled] can be called.
				For gameplay input, this and [method _unhandled_input] are usually a better fit than [method _input] as they allow the GUI to intercept the events first.
				[b]Note:[/b] This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
			</description>
		</method>
		<method name="add_child">
			<return type="void" />
			<argument index="0" name="node" type="Node" />
			<argument index="1" name="legible_unique_name" type="bool" default="false" />
			<description>
				Adds a child node. Nodes can have any number of children, but every child must have a unique name. Child nodes are automatically deleted when the parent node is deleted, so an entire scene can be removed by deleting its topmost node.
				If [code]legible_unique_name[/code] is [code]true[/code], the child node will have a human-readable name based on the name of the node being instantiated instead of its type.
				[b]Note:[/b] If the child node already has a parent, the function will fail. Use [method remove_child] first to remove the node from its current parent. For example:
				[codeblocks]
				[gdscript]
				var child_node = get_child(0)
				if child_node.get_parent():
				    child_node.get_parent().remove_child(child_node)
				add_child(child_node)
				[/gdscript]
				[csharp]
				Node childNode = GetChild(0);
				if (childNode.GetParent() != null)
				{
				    childNode.GetParent().RemoveChild(childNode);
				}
				AddChild(childNode);
				[/csharp]
				[/codeblocks]
				If you need the child node to be added below a specific node in the list of children, use [method add_sibling] instead of this method.
				[b]Note:[/b] If you want a child to be persisted to a [PackedScene], you must set [member owner] in addition to calling [method add_child]. This is typically relevant for [url=https://godot.readthedocs.io/en/latest/tutorials/misc/running_code_in_the_editor.html]tool scripts[/url] and [url=https://godot.readthedocs.io/en/latest/tutorials/plugins/editor/index.html]editor plugins[/url]. If [method add_child] is called without setting [member owner], the newly added [Node] will not be visible in the scene tree, though it will be visible in the 2D/3D view.
			</description>
		</method>
		<method name="add_sibling">
			<return type="void" />
			<argument index="0" name="sibling" type="Node" />
			<argument index="1" name="legible_unique_name" type="bool" default="false" />
			<description>
				Adds a [code]sibling[/code] node to current's node parent, at the same level as that node, right below it.
				If [code]legible_unique_name[/code] is [code]true[/code], the child node will have a human-readable name based on the name of the node being instantiated instead of its type.
				Use [method add_child] instead of this method if you don't need the child node to be added below a specific node in the list of children.
			</description>
		</method>
		<method name="add_to_group">
			<return type="void" />
			<argument index="0" name="group" type="StringName" />
			<argument index="1" name="persistent" type="bool" default="false" />
			<description>
				Adds the node to a group. Groups are helpers to name and organize a subset of nodes, for example "enemies" or "collectables". A node can be in any number of groups. Nodes can be assigned a group at any time, but will not be added until they are inside the scene tree (see [method is_inside_tree]). See notes in the description, and the group methods in [SceneTree].
				The [code]persistent[/code] option is used when packing node to [PackedScene] and saving to file. Non-persistent groups aren't stored.
			</description>
		</method>
		<method name="can_process" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the node can process while the scene tree is paused (see [member process_mode]). Always returns [code]true[/code] if the scene tree is not paused, and [code]false[/code] if the node is not in the tree.
			</description>
		</method>
		<method name="create_tween">
			<return type="Tween" />
			<description>
				Creates a new [Tween] and binds it to this node. This is equivalent of doing:
				[codeblock]
				get_tree().create_tween().bind_node(self)
				[/codeblock]
			</description>
		</method>
		<method name="duplicate" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="flags" type="int" default="15" />
			<description>
				Duplicates the node, returning a new node.
				You can fine-tune the behavior using the [code]flags[/code] (see [enum DuplicateFlags]).
				[b]Note:[/b] It will not work properly if the node contains a script with constructor arguments (i.e. needs to supply arguments to [method Object._init] method). In that case, the node will be duplicated without a script.
			</description>
		</method>
		<method name="find_node" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="mask" type="String" />
			<argument index="1" name="recursive" type="bool" default="true" />
			<argument index="2" name="owned" type="bool" default="true" />
			<description>
				Finds a descendant of this node whose name matches [code]mask[/code] as in [method String.match] (i.e. case-sensitive, but [code]"*"[/code] matches zero or more characters and [code]"?"[/code] matches any single character except [code]"."[/code]).
				[b]Note:[/b] It does not match against the full path, just against individual node names.
				If [code]owned[/code] is [code]true[/code], this method only finds nodes whose owner is this node. This is especially important for scenes instantiated through a script, because those scenes don't have an owner.
				[b]Note:[/b] As this method walks through all the descendants of the node, it is the slowest way to get a reference to another node. Whenever possible, consider using [method get_node] instead. To avoid using [method find_node] too often, consider caching the node reference into a variable.
			</description>
		</method>
		<method name="find_parent" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="mask" type="String" />
			<description>
				Finds the first parent of the current node whose name matches [code]mask[/code] as in [method String.match] (i.e. case-sensitive, but [code]"*"[/code] matches zero or more characters and [code]"?"[/code] matches any single character except [code]"."[/code]).
				[b]Note:[/b] It does not match against the full path, just against individual node names.
				[b]Note:[/b] As this method walks upwards in the scene tree, it can be slow in large, deeply nested scene trees. Whenever possible, consider using [method get_node] instead. To avoid using [method find_parent] too often, consider caching the node reference into a variable.
			</description>
		</method>
		<method name="get_child" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="idx" type="int" />
			<description>
				Returns a child node by its index (see [method get_child_count]). This method is often used for iterating all children of a node.
				Negative indices access the children from the last one.
				To access a child node via its name, use [method get_node].
			</description>
		</method>
		<method name="get_child_count" qualifiers="const">
			<return type="int" />
			<description>
				Returns the number of child nodes.
			</description>
		</method>
		<method name="get_children" qualifiers="const">
			<return type="Node[]" />
			<description>
				Returns an array of references to node's children.
			</description>
		</method>
		<method name="get_editor_description" qualifiers="const">
			<return type="String" />
			<description>
			</description>
		</method>
		<method name="get_groups" qualifiers="const">
			<return type="Array" />
			<description>
				Returns an array listing the groups that the node is a member of.
			</description>
		</method>
		<method name="get_index" qualifiers="const">
			<return type="int" />
			<description>
				Returns the node's order in the scene tree branch. For example, if called on the first child node the position is [code]0[/code].
			</description>
		</method>
		<method name="get_network_master" qualifiers="const">
			<return type="int" />
			<description>
				Returns the peer ID of the network master for this node. See [method set_network_master].
			</description>
		</method>
		<method name="get_node" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="path" type="NodePath" />
			<description>
				Fetches a node. The [NodePath] can be either a relative path (from the current node) or an absolute path (in the scene tree) to a node. If the path does not exist, a [code]null instance[/code] is returned and an error is logged. Attempts to access methods on the return value will result in an "Attempt to call &lt;method&gt; on a null instance." error.
				[b]Note:[/b] Fetching absolute paths only works when the node is inside the scene tree (see [method is_inside_tree]).
				[b]Example:[/b] Assume your current node is Character and the following tree:
				[codeblock]
				/root
				/root/Character
				/root/Character/Sword
				/root/Character/Backpack/Dagger
				/root/MyGame
				/root/Swamp/Alligator
				/root/Swamp/Mosquito
				/root/Swamp/Goblin
				[/codeblock]
				Possible paths are:
				[codeblocks]
				[gdscript]
				get_node("Sword")
				get_node("Backpack/Dagger")
				get_node("../Swamp/Alligator")
				get_node("/root/MyGame")
				[/gdscript]
				[csharp]
				GetNode("Sword");
				GetNode("Backpack/Dagger");
				GetNode("../Swamp/Alligator");
				GetNode("/root/MyGame");
				[/csharp]
				[/codeblocks]
			</description>
		</method>
		<method name="get_node_and_resource">
			<return type="Array" />
			<argument index="0" name="path" type="NodePath" />
			<description>
				Fetches a node and one of its resources as specified by the [NodePath]'s subname (e.g. [code]Area2D/CollisionShape2D:shape[/code]). If several nested resources are specified in the [NodePath], the last one will be fetched.
				The return value is an array of size 3: the first index points to the [Node] (or [code]null[/code] if not found), the second index points to the [Resource] (or [code]null[/code] if not found), and the third index is the remaining [NodePath], if any.
				For example, assuming that [code]Area2D/CollisionShape2D[/code] is a valid node and that its [code]shape[/code] property has been assigned a [RectangleShape2D] resource, one could have this kind of output:
				[codeblocks]
				[gdscript]
				print(get_node_and_resource("Area2D/CollisionShape2D")) # [[CollisionShape2D:1161], Null, ]
				print(get_node_and_resource("Area2D/CollisionShape2D:shape")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], ]
				print(get_node_and_resource("Area2D/CollisionShape2D:shape:extents")) # [[CollisionShape2D:1161], [RectangleShape2D:1156], :extents]
				[/gdscript]
				[csharp]
				GD.Print(GetNodeAndResource("Area2D/CollisionShape2D")); // [[CollisionShape2D:1161], Null, ]
				GD.Print(GetNodeAndResource("Area2D/CollisionShape2D:shape")); // [[CollisionShape2D:1161], [RectangleShape2D:1156], ]
				GD.Print(GetNodeAndResource("Area2D/CollisionShape2D:shape:extents")); // [[CollisionShape2D:1161], [RectangleShape2D:1156], :extents]
				[/csharp]
				[/codeblocks]
			</description>
		</method>
		<method name="get_node_or_null" qualifiers="const">
			<return type="Node" />
			<argument index="0" name="path" type="NodePath" />
			<description>
				Similar to [method get_node], but does not log an error if [code]path[/code] does not point to a valid [Node].
			</description>
		</method>
		<method name="get_parent" qualifiers="const">
			<return type="Node" />
			<description>
				Returns the parent node of the current node, or a [code]null instance[/code] if the node lacks a parent.
			</description>
		</method>
		<method name="get_path" qualifiers="const">
			<return type="NodePath" />
			<description>
				Returns the absolute path of the current node. This only works if the current node is inside the scene tree (see [method is_inside_tree]).
			</description>
		</method>
		<method name="get_path_to" qualifiers="const">
			<return type="NodePath" />
			<argument index="0" name="node" type="Node" />
			<description>
				Returns the relative [NodePath] from this node to the specified [code]node[/code]. Both nodes must be in the same scene or the function will fail.
			</description>
		</method>
		<method name="get_physics_process_delta_time" qualifiers="const">
			<return type="float" />
			<description>
				Returns the time elapsed (in seconds) since the last physics-bound frame (see [method _physics_process]). This is always a constant value in physics processing unless the frames per second is changed via [member Engine.physics_ticks_per_second].
			</description>
		</method>
		<method name="get_process_delta_time" qualifiers="const">
			<return type="float" />
			<description>
				Returns the time elapsed (in seconds) since the last process callback. This value may vary from frame to frame.
			</description>
		</method>
		<method name="get_scene_instance_load_placeholder" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if this is an instance load placeholder. See [InstancePlaceholder].
			</description>
		</method>
		<method name="get_tree" qualifiers="const">
			<return type="SceneTree" />
			<description>
				Returns the [SceneTree] that contains this node.
			</description>
		</method>
		<method name="get_viewport" qualifiers="const">
			<return type="Viewport" />
			<description>
				Returns the node's [Viewport].
			</description>
		</method>
		<method name="has_node" qualifiers="const">
			<return type="bool" />
			<argument index="0" name="path" type="NodePath" />
			<description>
				Returns [code]true[/code] if the node that the [NodePath] points to exists.
			</description>
		</method>
		<method name="has_node_and_resource" qualifiers="const">
			<return type="bool" />
			<argument index="0" name="path" type="NodePath" />
			<description>
				Returns [code]true[/code] if the [NodePath] points to a valid node and its subname points to a valid resource, e.g. [code]Area2D/CollisionShape2D:shape[/code]. Properties with a non-[Resource] type (e.g. nodes or primitive math types) are not considered resources.
			</description>
		</method>
		<method name="is_ancestor_of" qualifiers="const">
			<return type="bool" />
			<argument index="0" name="node" type="Node" />
			<description>
				Returns [code]true[/code] if the given node is a direct or indirect child of the current node.
			</description>
		</method>
		<method name="is_displayed_folded" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the node is folded (collapsed) in the Scene dock.
			</description>
		</method>
		<method name="is_greater_than" qualifiers="const">
			<return type="bool" />
			<argument index="0" name="node" type="Node" />
			<description>
				Returns [code]true[/code] if the given node occurs later in the scene hierarchy than the current node.
			</description>
		</method>
		<method name="is_in_group" qualifiers="const">
			<return type="bool" />
			<argument index="0" name="group" type="StringName" />
			<description>
				Returns [code]true[/code] if this node is in the specified group. See notes in the description, and the group methods in [SceneTree].
			</description>
		</method>
		<method name="is_inside_tree" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if this node is currently inside a [SceneTree].
			</description>
		</method>
		<method name="is_network_master" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the local system is the master of this node.
			</description>
		</method>
		<method name="is_physics_processing" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if physics processing is enabled (see [method set_physics_process]).
			</description>
		</method>
		<method name="is_physics_processing_internal" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if internal physics processing is enabled (see [method set_physics_process_internal]).
			</description>
		</method>
		<method name="is_processing" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if processing is enabled (see [method set_process]).
			</description>
		</method>
		<method name="is_processing_input" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the node is processing input (see [method set_process_input]).
			</description>
		</method>
		<method name="is_processing_internal" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if internal processing is enabled (see [method set_process_internal]).
			</description>
		</method>
		<method name="is_processing_unhandled_input" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the node is processing unhandled input (see [method set_process_unhandled_input]).
			</description>
		</method>
		<method name="is_processing_unhandled_key_input" qualifiers="const">
			<return type="bool" />
			<description>
				Returns [code]true[/code] if the node is processing unhandled key input (see [method set_process_unhandled_key_input]).
			</description>
		</method>
		<method name="move_child">
			<return type="void" />
			<argument index="0" name="child_node" type="Node" />
			<argument index="1" name="to_position" type="int" />
			<description>
				Moves a child node to a different position (order) among the other children. Since calls, signals, etc are performed by tree order, changing the order of children nodes may be useful.
			</description>
		</method>
		<method name="print_stray_nodes">
			<return type="void" />
			<description>
				Prints all stray nodes (nodes outside the [SceneTree]). Used for debugging. Works only in debug builds.
			</description>
		</method>
		<method name="print_tree">
			<return type="void" />
			<description>
				Prints the tree to stdout. Used mainly for debugging purposes. This version displays the path relative to the current node, and is good for copy/pasting into the [method get_node] function.
				[b]Example output:[/b]
				[codeblock]
				TheGame
				TheGame/Menu
				TheGame/Menu/Label
				TheGame/Menu/Camera2D
				TheGame/SplashScreen
				TheGame/SplashScreen/Camera2D
				[/codeblock]
			</description>
		</method>
		<method name="print_tree_pretty">
			<return type="void" />
			<description>
				Similar to [method print_tree], this prints the tree to stdout. This version displays a more graphical representation similar to what is displayed in the scene inspector. It is useful for inspecting larger trees.
				[b]Example output:[/b]
				[codeblock]
				 ┖╴TheGame
				    ┠╴Menu
				    ┃  ┠╴Label
				    ┃  ┖╴Camera2D
				    ┖╴SplashScreen
				       ┖╴Camera2D
				[/codeblock]
			</description>
		</method>
		<method name="propagate_call">
			<return type="void" />
			<argument index="0" name="method" type="StringName" />
			<argument index="1" name="args" type="Array" default="[]" />
			<argument index="2" name="parent_first" type="bool" default="false" />
			<description>
				Calls the given method (if present) with the arguments given in [code]args[/code] on this node and recursively on all its children. If the [code]parent_first[/code] argument is [code]true[/code], the method will be called on the current node first, then on all its children. If [code]parent_first[/code] is [code]false[/code], the children will be called first.
			</description>
		</method>
		<method name="propagate_notification">
			<return type="void" />
			<argument index="0" name="what" type="int" />
			<description>
				Notifies the current node and all its children recursively by calling [method Object.notification] on all of them.
			</description>
		</method>
		<method name="queue_free">
			<return type="void" />
			<description>
				Queues a node for deletion at the end of the current frame. When deleted, all of its child nodes will be deleted as well. This method ensures it's safe to delete the node, contrary to [method Object.free]. Use [method Object.is_queued_for_deletion] to check whether a node will be deleted at the end of the frame.
			</description>
		</method>
		<method name="raise">
			<return type="void" />
			<description>
				Moves this node to the bottom of parent node's children hierarchy. This is often useful in GUIs ([Control] nodes), because their order of drawing depends on their order in the tree. The top Node is drawn first, then any siblings below the top Node in the hierarchy are successively drawn on top of it. After using [code]raise[/code], a Control will be drawn on top of its siblings.
			</description>
		</method>
		<method name="remove_and_skip">
			<return type="void" />
			<description>
				Removes a node and sets all its children as children of the parent node (if it exists). All event subscriptions that pass by the removed node will be unsubscribed.
			</description>
		</method>
		<method name="remove_child">
			<return type="void" />
			<argument index="0" name="node" type="Node" />
			<description>
				Removes a child node. The node is NOT deleted and must be deleted manually.
			</description>
		</method>
		<method name="remove_from_group">
			<return type="void" />
			<argument index="0" name="group" type="StringName" />
			<description>
				Removes a node from a group. See notes in the description, and the group methods in [SceneTree].
			</description>
		</method>
		<method name="replace_by">
			<return type="void" />
			<argument index="0" name="node" type="Node" />
			<argument index="1" name="keep_groups" type="bool" default="false" />
			<description>
				Replaces a node in a scene by the given one. Subscriptions that pass through this node will be lost.
				If [code]keep_groups[/code] is [code]true[/code], the [code]node[/code] is added to the same groups that the replaced node is in.
			</description>
		</method>
		<method name="request_ready">
			<return type="void" />
			<description>
				Requests that [code]_ready[/code] be called again. Note that the method won't be called immediately, but is scheduled for when the node is added to the scene tree again (see [method _ready]). [code]_ready[/code] is called only for the node which requested it, which means that you need to request ready for each child if you want them to call [code]_ready[/code] too (in which case, [code]_ready[/code] will be called in the same order as it would normally).
			</description>
		</method>
		<method name="rpc" qualifiers="vararg">
			<return type="Variant" />
			<argument index="0" name="method" type="StringName" />
			<description>
				Sends a remote procedure call request for the given [code]method[/code] to peers on the network (and locally), optionally sending all additional arguments as arguments to the method called by the RPC. The call request will only be received by nodes with the same [NodePath], including the exact same node name. Behaviour depends on the RPC configuration for the given method, see [method rpc_config]. Methods are not exposed to RPCs by default. Returns an empty [Variant].
				[b]Note:[/b] You can only safely use RPCs on clients after you received the [code]connected_to_server[/code] signal from the [MultiplayerAPI]. You also need to keep track of the connection state, either by the [MultiplayerAPI] signals like [code]server_disconnected[/code] or by checking [code]get_multiplayer().network_peer.get_connection_status() == CONNECTION_CONNECTED[/code].
			</description>
		</method>
		<method name="rpc_config">
			<return type="int" />
			<argument index="0" name="method" type="StringName" />
			<argument index="1" name="rpc_mode" type="int" enum="MultiplayerAPI.RPCMode" />
			<argument index="2" name="transfer_mode" type="int" enum="MultiplayerPeer.TransferMode" default="2" />
			<argument index="3" name="channel" type="int" default="0" />
			<description>
				Changes the RPC mode for the given [code]method[/code] to the given [code]rpc_mode[/code], optionally specifying the [code]transfer_mode[/code] and [code]channel[/code] (on supported peers). See [enum MultiplayerAPI.RPCMode] and [enum MultiplayerPeer.TransferMode]. An alternative is annotating methods and properties with the corresponding keywords ([code]remote[/code], [code]master[/code], [code]puppet[/code], [code]remotesync[/code], [code]mastersync[/code], [code]puppetsync[/code]). By default, methods are not exposed to networking (and RPCs).
			</description>
		</method>
		<method name="rpc_id" qualifiers="vararg">
			<return type="Variant" />
			<argument index="0" name="peer_id" type="int" />
			<argument index="1" name="method" type="StringName" />
			<description>
				Sends a [method rpc] to a specific peer identified by [code]peer_id[/code] (see [method MultiplayerPeer.set_target_peer]). Returns an empty [Variant].
			</description>
		</method>
		<method name="set_display_folded">
			<return type="void" />
			<argument index="0" name="fold" type="bool" />
			<description>
				Sets the folded state of the node in the Scene dock.
			</description>
		</method>
		<method name="set_editor_description">
			<return type="void" />
			<argument index="0" name="editor_description" type="String" />
			<description>
			</description>
		</method>
		<method name="set_network_master">
			<return type="void" />
			<argument index="0" name="id" type="int" />
			<argument index="1" name="recursive" type="bool" default="true" />
			<description>
				Sets the node's network master to the peer with the given peer ID. The network master is the peer that has authority over the node on the network. Useful in conjunction with the [code]master[/code] and [code]puppet[/code] keywords. Inherited from the parent node by default, which ultimately defaults to peer ID 1 (the server). If [code]recursive[/code], the given peer is recursively set as the master for all children of this node.
			</description>
		</method>
		<method name="set_physics_process">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables or disables physics (i.e. fixed framerate) processing. When a node is being processed, it will receive a [constant NOTIFICATION_PHYSICS_PROCESS] at a fixed (usually 60 FPS, see [member Engine.physics_ticks_per_second] to change) interval (and the [method _physics_process] callback will be called if exists). Enabled automatically if [method _physics_process] is overridden. Any calls to this before [method _ready] will be ignored.
			</description>
		</method>
		<method name="set_physics_process_internal">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables or disables internal physics for this node. Internal physics processing happens in isolation from the normal [method _physics_process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or physics processing is disabled for scripting ([method set_physics_process]). Only useful for advanced uses to manipulate built-in nodes' behavior.
				[b]Warning:[/b] Built-in Nodes rely on the internal processing for their own logic, so changing this value from your code may lead to unexpected behavior. Script access to this internal logic is provided for specific advanced uses, but is unsafe and not supported.
			</description>
		</method>
		<method name="set_process">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables or disables processing. When a node is being processed, it will receive a [constant NOTIFICATION_PROCESS] on every drawn frame (and the [method _process] callback will be called if exists). Enabled automatically if [method _process] is overridden. Any calls to this before [method _ready] will be ignored.
			</description>
		</method>
		<method name="set_process_input">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables or disables input processing. This is not required for GUI controls! Enabled automatically if [method _input] is overridden. Any calls to this before [method _ready] will be ignored.
			</description>
		</method>
		<method name="set_process_internal">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables or disabled internal processing for this node. Internal processing happens in isolation from the normal [method _process] calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or processing is disabled for scripting ([method set_process]). Only useful for advanced uses to manipulate built-in nodes' behavior.
				[b]Warning:[/b] Built-in Nodes rely on the internal processing for their own logic, so changing this value from your code may lead to unexpected behavior. Script access to this internal logic is provided for specific advanced uses, but is unsafe and not supported.
			</description>
		</method>
		<method name="set_process_unhandled_input">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables unhandled input processing. This is not required for GUI controls! It enables the node to receive all input that was not previously handled (usually by a [Control]). Enabled automatically if [method _unhandled_input] is overridden. Any calls to this before [method _ready] will be ignored.
			</description>
		</method>
		<method name="set_process_unhandled_key_input">
			<return type="void" />
			<argument index="0" name="enable" type="bool" />
			<description>
				Enables unhandled key input processing. Enabled automatically if [method _unhandled_key_input] is overridden. Any calls to this before [method _ready] will be ignored.
			</description>
		</method>
		<method name="set_scene_instance_load_placeholder">
			<return type="void" />
			<argument index="0" name="load_placeholder" type="bool" />
			<description>
				Sets whether this is an instance load placeholder. See [InstancePlaceholder].
			</description>
		</method>
		<method name="update_configuration_warnings">
			<return type="void" />
			<description>
				Updates the warning displayed for this node in the Scene Dock.
				Use [method _get_configuration_warnings] to setup the warning message to display.
			</description>
		</method>
	</methods>
	<members>
		<member name="custom_multiplayer" type="MultiplayerAPI" setter="set_custom_multiplayer" getter="get_custom_multiplayer">
			The override to the default [MultiplayerAPI]. Set to [code]null[/code] to use the default [SceneTree] one.
		</member>
		<member name="filename" type="String" setter="set_filename" getter="get_filename">
			When a scene is instantiated from a file, its topmost node contains the filename from which it was loaded.
		</member>
		<member name="multiplayer" type="MultiplayerAPI" setter="" getter="get_multiplayer">
			The [MultiplayerAPI] instance associated with this node. Either the [member custom_multiplayer], or the default SceneTree one (if inside tree).
		</member>
		<member name="name" type="StringName" setter="set_name" getter="get_name">
			The name of the node. This name is unique among the siblings (other child nodes from the same parent). When set to an existing name, the node will be automatically renamed.
			[b]Note:[/b] Auto-generated names might include the [code]@[/code] character, which is reserved for unique names when using [method add_child]. When setting the name manually, any [code]@[/code] will be removed.
		</member>
		<member name="owner" type="Node" setter="set_owner" getter="get_owner">
			The node owner. A node can have any other node as owner (as long as it is a valid parent, grandparent, etc. ascending in the tree). When saving a node (using [PackedScene]), all the nodes it owns will be saved with it. This allows for the creation of complex [SceneTree]s, with instancing and subinstancing.
		</member>
		<member name="process_mode" type="int" setter="set_process_mode" getter="get_process_mode" enum="Node.ProcessMode" default="0">
			Can be used to pause or unpause the node, or make the node paused based on the [SceneTree], or make it inherit the process mode from its parent (default).
		</member>
		<member name="process_priority" type="int" setter="set_process_priority" getter="get_process_priority" default="0">
			The node's priority in the execution order of the enabled processing callbacks (i.e. [constant NOTIFICATION_PROCESS], [constant NOTIFICATION_PHYSICS_PROCESS] and their internal counterparts). Nodes whose process priority value is [i]lower[/i] will have their processing callbacks executed first.
		</member>
	</members>
	<signals>
		<signal name="ready">
			<description>
				Emitted when the node is ready.
			</description>
		</signal>
		<signal name="renamed">
			<description>
				Emitted when the node is renamed.
			</description>
		</signal>
		<signal name="tree_entered">
			<description>
				Emitted when the node enters the tree.
			</description>
		</signal>
		<signal name="tree_exited">
			<description>
				Emitted after the node exits the tree and is no longer active.
			</description>
		</signal>
		<signal name="tree_exiting">
			<description>
				Emitted when the node is still active but about to exit the tree. This is the right place for de-initialization (or a "destructor", if you will).
			</description>
		</signal>
	</signals>
	<constants>
		<constant name="NOTIFICATION_ENTER_TREE" value="10">
			Notification received when the node enters a [SceneTree].
		</constant>
		<constant name="NOTIFICATION_EXIT_TREE" value="11">
			Notification received when the node is about to exit a [SceneTree].
		</constant>
		<constant name="NOTIFICATION_MOVED_IN_PARENT" value="12">
			Notification received when the node is moved in the parent.
		</constant>
		<constant name="NOTIFICATION_READY" value="13">
			Notification received when the node is ready. See [method _ready].
		</constant>
		<constant name="NOTIFICATION_PAUSED" value="14">
			Notification received when the node is paused.
		</constant>
		<constant name="NOTIFICATION_UNPAUSED" value="15">
			Notification received when the node is unpaused.
		</constant>
		<constant name="NOTIFICATION_PHYSICS_PROCESS" value="16">
			Notification received every frame when the physics process flag is set (see [method set_physics_process]).
		</constant>
		<constant name="NOTIFICATION_PROCESS" value="17">
			Notification received every frame when the process flag is set (see [method set_process]).
		</constant>
		<constant name="NOTIFICATION_PARENTED" value="18">
			Notification received when a node is set as a child of another node.
			[b]Note:[/b] This doesn't mean that a node entered the [SceneTree].
		</constant>
		<constant name="NOTIFICATION_UNPARENTED" value="19">
			Notification received when a node is unparented (parent removed it from the list of children).
		</constant>
		<constant name="NOTIFICATION_INSTANCED" value="20">
			Notification received when the node is instantiated.
		</constant>
		<constant name="NOTIFICATION_DRAG_BEGIN" value="21">
			Notification received when a drag begins.
		</constant>
		<constant name="NOTIFICATION_DRAG_END" value="22">
			Notification received when a drag ends.
		</constant>
		<constant name="NOTIFICATION_PATH_CHANGED" value="23">
			Notification received when the node's [NodePath] changed.
		</constant>
		<constant name="NOTIFICATION_INTERNAL_PROCESS" value="25">
			Notification received every frame when the internal process flag is set (see [method set_process_internal]).
		</constant>
		<constant name="NOTIFICATION_INTERNAL_PHYSICS_PROCESS" value="26">
			Notification received every frame when the internal physics process flag is set (see [method set_physics_process_internal]).
		</constant>
		<constant name="NOTIFICATION_POST_ENTER_TREE" value="27">
			Notification received when the node is ready, just before [constant NOTIFICATION_READY] is received. Unlike the latter, it's sent every time the node enters tree, instead of only once.
		</constant>
		<constant name="NOTIFICATION_DISABLED" value="28">
			Notification received when the node is disabled. See [constant PROCESS_MODE_DISABLED].
		</constant>
		<constant name="NOTIFICATION_ENABLED" value="29">
			Notification received when the node is enabled again after being disabled. See [constant PROCESS_MODE_DISABLED].
		</constant>
		<constant name="NOTIFICATION_EDITOR_PRE_SAVE" value="9001">
			Notification received right before the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
		</constant>
		<constant name="NOTIFICATION_EDITOR_POST_SAVE" value="9002">
			Notification received right after the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
		</constant>
		<constant name="NOTIFICATION_WM_MOUSE_ENTER" value="1002">
			Notification received from the OS when the mouse enters the game window.
			Implemented on desktop and web platforms.
		</constant>
		<constant name="NOTIFICATION_WM_MOUSE_EXIT" value="1003">
			Notification received from the OS when the mouse leaves the game window.
			Implemented on desktop and web platforms.
		</constant>
		<constant name="NOTIFICATION_WM_WINDOW_FOCUS_IN" value="1004">
			Notification received from the OS when the node's parent [Window] is focused. This may be a change of focus between two windows of the same engine instance, or from the OS desktop or a third-party application to a window of the game (in which case [constant NOTIFICATION_APPLICATION_FOCUS_IN] is also emitted).
		</constant>
		<constant name="NOTIFICATION_WM_WINDOW_FOCUS_OUT" value="1005">
			Notification received from the OS when the node's parent [Window] is defocused. This may be a change of focus between two windows of the same engine instance, or from a window of the game to the OS desktop or a third-party application (in which case [constant NOTIFICATION_APPLICATION_FOCUS_OUT] is also emitted).
		</constant>
		<constant name="NOTIFICATION_WM_CLOSE_REQUEST" value="1006">
			Notification received from the OS when a close request is sent (e.g. closing the window with a "Close" button or [kbd]Alt + F4[/kbd]).
			Implemented on desktop platforms.
		</constant>
		<constant name="NOTIFICATION_WM_GO_BACK_REQUEST" value="1007">
			Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
			Specific to the Android platform.
		</constant>
		<constant name="NOTIFICATION_WM_SIZE_CHANGED" value="1008">
		</constant>
		<constant name="NOTIFICATION_OS_MEMORY_WARNING" value="2009">
			Notification received from the OS when the application is exceeding its allocated memory.
			Specific to the iOS platform.
		</constant>
		<constant name="NOTIFICATION_TRANSLATION_CHANGED" value="2010">
			Notification received when translations may have changed. Can be triggered by the user changing the locale. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like [method Object.tr].
		</constant>
		<constant name="NOTIFICATION_WM_ABOUT" value="2011">
			Notification received from the OS when a request for "About" information is sent.
			Specific to the macOS platform.
		</constant>
		<constant name="NOTIFICATION_CRASH" value="2012">
			Notification received from Godot's crash handler when the engine is about to crash.
			Implemented on desktop platforms if the crash handler is enabled.
		</constant>
		<constant name="NOTIFICATION_OS_IME_UPDATE" value="2013">
			Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
			Specific to the macOS platform.
		</constant>
		<constant name="NOTIFICATION_APPLICATION_RESUMED" value="2014">
			Notification received from the OS when the application is resumed.
			Specific to the Android platform.
		</constant>
		<constant name="NOTIFICATION_APPLICATION_PAUSED" value="2015">
			Notification received from the OS when the application is paused.
			Specific to the Android platform.
		</constant>
		<constant name="NOTIFICATION_APPLICATION_FOCUS_IN" value="2016">
			Notification received from the OS when the application is focused, i.e. when changing the focus from the OS desktop or a thirdparty application to any open window of the Godot instance.
			Implemented on desktop platforms.
		</constant>
		<constant name="NOTIFICATION_APPLICATION_FOCUS_OUT" value="2017">
			Notification received from the OS when the application is defocused, i.e. when changing the focus from any open window of the Godot instance to the OS desktop or a thirdparty application.
			Implemented on desktop platforms.
		</constant>
		<constant name="NOTIFICATION_TEXT_SERVER_CHANGED" value="2018">
			Notification received when text server is changed.
		</constant>
		<constant name="PROCESS_MODE_INHERIT" value="0" enum="ProcessMode">
			Inherits process mode from the node's parent. For the root node, it is equivalent to [constant PROCESS_MODE_PAUSABLE]. Default.
		</constant>
		<constant name="PROCESS_MODE_PAUSABLE" value="1" enum="ProcessMode">
			Stops processing when the [SceneTree] is paused (process when unpaused). This is the inverse of [constant PROCESS_MODE_WHEN_PAUSED].
		</constant>
		<constant name="PROCESS_MODE_WHEN_PAUSED" value="2" enum="ProcessMode">
			Only process when the [SceneTree] is paused (don't process when unpaused). This is the inverse of [constant PROCESS_MODE_PAUSABLE].
		</constant>
		<constant name="PROCESS_MODE_ALWAYS" value="3" enum="ProcessMode">
			Always process. Continue processing always, ignoring the [SceneTree]'s paused property. This is the inverse of [constant PROCESS_MODE_DISABLED].
		</constant>
		<constant name="PROCESS_MODE_DISABLED" value="4" enum="ProcessMode">
			Never process. Completely disables processing, ignoring the [SceneTree]'s paused property. This is the inverse of [constant PROCESS_MODE_ALWAYS].
		</constant>
		<constant name="DUPLICATE_SIGNALS" value="1" enum="DuplicateFlags">
			Duplicate the node's signals.
		</constant>
		<constant name="DUPLICATE_GROUPS" value="2" enum="DuplicateFlags">
			Duplicate the node's groups.
		</constant>
		<constant name="DUPLICATE_SCRIPTS" value="4" enum="DuplicateFlags">
			Duplicate the node's scripts.
		</constant>
		<constant name="DUPLICATE_USE_INSTANCING" value="8" enum="DuplicateFlags">
			Duplicate using instancing.
			An instance stays linked to the original so when the original changes, the instance changes too.
		</constant>
	</constants>
</class>`, `<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">

  <!-- Project configurations -->
  <ItemGroup Label="ProjectConfigurations">
    <ProjectConfiguration Include="Debug|x64">
      <Configuration>Debug</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|x64">
      <Configuration>Release</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
  </ItemGroup>
  
  <!-- Props that should be disabled while building on CI server -->
  <ItemDefinitionGroup Condition="'$(CIBuild)'!='true'">
    <ClCompile>
      <MultiProcessorCompilation>true</MultiProcessorCompilation>
      <PrecompiledHeader>Use</PrecompiledHeader>
    </ClCompile>
  </ItemDefinitionGroup>

  <!-- C++ source compile-specific things for all configurations -->
  <ItemDefinitionGroup>
    <ClCompile>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
      <WarningLevel>Level3</WarningLevel>
      <ConformanceMode>false</ConformanceMode>
      <TreatWarningAsError>true</TreatWarningAsError>
      <LanguageStandard>stdcpplatest</LanguageStandard>
      <AdditionalOptions>/await %(AdditionalOptions)</AdditionalOptions>
      <PreprocessorDefinitions>_UNICODE;UNICODE;%(PreprocessorDefinitions)</PreprocessorDefinitions>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
    </Link>    
    <Lib>
      <TreatLibWarningAsErrors>true</TreatLibWarningAsErrors>
    </Lib>    
  </ItemDefinitionGroup>

  <!-- C++ source compile-specific things for Debug/Release configurations -->
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <ClCompile>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Optimization>Disabled</Optimization>
      <SDLCheck>true</SDLCheck>
      <RuntimeLibrary>MultiThreadedDebug</RuntimeLibrary>
    </ClCompile>
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
    </Link>    
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <ClCompile>
      <PreprocessorDefinitions>NDEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Optimization>MaxSpeed</Optimization>
      <SDLCheck>false</SDLCheck>
      <RuntimeLibrary>MultiThreaded</RuntimeLibrary>
      <FunctionLevelLinking>true</FunctionLevelLinking>
      <IntrinsicFunctions>true</IntrinsicFunctions>
    </ClCompile>  
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <OptimizeReferences>true</OptimizeReferences>
    </Link>    
  </ItemDefinitionGroup>

  <!-- Global props -->
  <PropertyGroup Label="Globals" Condition="'$(OverrideWindowsTargetPlatformVersion)'!='True'">
    <WindowsTargetPlatformVersion>10.0.17134.0</WindowsTargetPlatformVersion>
  </PropertyGroup>

  <!-- Props that are constant for both Debug and Release configurations -->
  <PropertyGroup Label="Configuration">
    <PlatformToolset Condition="'$(OverridePlatformToolset)'!='True'">v142</PlatformToolset>
    <IntDir>$(SolutionDir)$(Platform)\$(Configuration)\obj\$(ProjectName)\</IntDir>
    <CharacterSet>Unicode</CharacterSet>
    <SpectreMitigation>Spectre</SpectreMitigation>
  </PropertyGroup>

  <!-- Debug/Release props -->
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="Configuration">
      <UseDebugLibraries>true</UseDebugLibraries>
      <LinkIncremental>true</LinkIncremental>
    </PropertyGroup>
    <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
      <UseDebugLibraries>false</UseDebugLibraries>
      <WholeProgramOptimization>true</WholeProgramOptimization>
      <LinkIncremental>false</LinkIncremental>
    </PropertyGroup>

</Project>`, `<?xml version="1.0" encoding="UTF-8" ?>
<class name="IP" inherits="Object" category="Core" version="3.2">
	<brief_description>
		Internet protocol (IP) support functions like DNS resolution.
	</brief_description>
	<description>
		IP contains support functions for the Internet Protocol (IP). TCP/IP support is in different classes (see [StreamPeerTCP] and [TCP_Server]). IP provides DNS hostname resolution support, both blocking and threaded.
	</description>
	<tutorials>
	</tutorials>
	<demos>
	</demos>
	<methods>
		<method name="clear_cache">
			<return type="void">
			</return>
			<argument index="0" name="hostname" type="String" default="&quot;&quot;">
			</argument>
			<description>
				Removes all of a "hostname"'s cached references. If no "hostname" is given then all cached IP addresses are removed.
			</description>
		</method>
		<method name="erase_resolve_item">
			<return type="void">
			</return>
			<argument index="0" name="id" type="int">
			</argument>
			<description>
				Removes a given item "id" from the queue. This should be used to free a queue after it has completed to enable more queries to happen.
			</description>
		</method>
		<method name="get_local_addresses" qualifiers="const">
			<return type="Array">
			</return>
			<description>
				Returns all of the user's current IPv4 and IPv6 addresses as an array.
			</description>
		</method>
		<method name="get_resolve_item_address" qualifiers="const">
			<return type="String">
			</return>
			<argument index="0" name="id" type="int">
			</argument>
			<description>
				Returns a queued hostname's IP address, given its queue "id". Returns an empty string on error or if resolution hasn't happened yet (see [method get_resolve_item_status]).
			</description>
		</method>
		<method name="get_resolve_item_status" qualifiers="const">
			<return type="int" enum="IP.ResolverStatus">
			</return>
			<argument index="0" name="id" type="int">
			</argument>
			<description>
				Returns a queued hostname's status as a RESOLVER_STATUS_* constant, given its queue "id".
			</description>
		</method>
		<method name="resolve_hostname">
			<return type="String">
			</return>
			<argument index="0" name="host" type="String">
			</argument>
			<argument index="1" name="ip_type" type="int" enum="IP.Type" default="3">
			</argument>
			<description>
				Returns a given hostname's IPv4 or IPv6 address when resolved (blocking-type method). The address type returned depends on the TYPE_* constant given as "ip_type".
			</description>
		</method>
		<method name="resolve_hostname_queue_item">
			<return type="int">
			</return>
			<argument index="0" name="host" type="String">
			</argument>
			<argument index="1" name="ip_type" type="int" enum="IP.Type" default="3">
			</argument>
			<description>
				Creates a queue item to resolve a hostname to an IPv4 or IPv6 address depending on the TYPE_* constant given as "ip_type". Returns the queue ID if successful, or RESOLVER_INVALID_ID on error.
			</description>
		</method>
	</methods>
	<constants>
		<constant name="RESOLVER_STATUS_NONE" value="0" enum="ResolverStatus">
			DNS hostname resolver status: No status.
		</constant>
		<constant name="RESOLVER_STATUS_WAITING" value="1" enum="ResolverStatus">
			DNS hostname resolver status: Waiting.
		</constant>
		<constant name="RESOLVER_STATUS_DONE" value="2" enum="ResolverStatus">
			DNS hostname resolver status: Done.
		</constant>
		<constant name="RESOLVER_STATUS_ERROR" value="3" enum="ResolverStatus">
			DNS hostname resolver status: Error.
		</constant>
		<constant name="RESOLVER_MAX_QUERIES" value="32">
			Maximum number of concurrent DNS resolver queries allowed, [code]RESOLVER_INVALID_ID[/code] is returned if exceeded.
		</constant>
		<constant name="RESOLVER_INVALID_ID" value="-1">
			Invalid ID constant. Returned if [code]RESOLVER_MAX_QUERIES[/code] is exceeded.
		</constant>
		<constant name="TYPE_NONE" value="0" enum="Type">
			Address type: None.
		</constant>
		<constant name="TYPE_IPV4" value="1" enum="Type">
			Address type: Internet protocol version 4 (IPv4).
		</constant>
		<constant name="TYPE_IPV6" value="2" enum="Type">
			Address type: Internet protocol version 6 (IPv6).
		</constant>
		<constant name="TYPE_ANY" value="3" enum="Type">
			Address type: Any.
		</constant>
	</constants>
</class>`, `<TS version="2.1" language="hr">
<context>
    <name>AddressBookPage</name>
    <message>
        <source>Right-click to edit address or label</source>
        <translation type="unfinished">Desni klik za uređivanje adrese ili oznake</translation>
    </message>
    <message>
        <source>Create a new address</source>
        <translation type="unfinished">Stvoriti  novu adresu</translation>
    </message>
    <message>
        <source>&amp;New</source>
        <translation type="unfinished">&amp;Nova</translation>
    </message>
    <message>
        <source>Copy the currently selected address to the system clipboard</source>
        <translation type="unfinished">Kopirajte trenutno odabranu adresu u međuspremnik</translation>
    </message>
    <message>
        <source>&amp;Copy</source>
        <translation type="unfinished">&amp;Kopirajte</translation>
    </message>
    <message>
        <source>C&amp;lose</source>
        <translation type="unfinished">&amp;Zatvorite</translation>
    </message>
    <message>
        <source>Delete the currently selected address from the list</source>
        <translation type="unfinished">Obrišite trenutno odabranu adresu s popisa.</translation>
    </message>
    <message>
        <source>Enter address or label to search</source>
        <translation type="unfinished">Unesite adresu ili oznaku za pretraživanje</translation>
    </message>
    <message>
        <source>Export the data in the current tab to a file</source>
        <translation type="unfinished">Izvezite podatke iz trenutne kartice u datoteku</translation>
    </message>
    <message>
        <source>&amp;Export</source>
        <translation type="unfinished">&amp;Izvozi</translation>
    </message>
    <message>
        <source>&amp;Delete</source>
        <translation type="unfinished">Iz&amp;brišite</translation>
    </message>
    <message>
        <source>Choose the address to send coins to</source>
        <translation type="unfinished">Odaberite adresu na koju ćete poslati novac</translation>
    </message>
    <message>
        <source>Choose the address to receive coins with</source>
        <translation type="unfinished">Odaberite adresu na koju ćete primiti novac</translation>
    </message>
    <message>
        <source>C&amp;hoose</source>
        <translation type="unfinished">&amp;Odaberite</translation>
    </message>
    <message>
        <source>Sending addresses</source>
        <translation type="unfinished">Adrese pošiljatelja</translation>
    </message>
    <message>
        <source>Receiving addresses</source>
        <translation type="unfinished">Adrese primatelja</translation>
    </message>
    <message>
        <source>These are your Bitcoin addresses for sending payments. Always check the amount and the receiving address before sending coins.</source>
        <translation type="unfinished">Ovo su vaše Bitcoin adrese za slanje novca. Uvijek provjerite iznos i adresu primatelja prije slanja novca.</translation>
    </message>
    <message>
        <source>These are your Bitcoin addresses for receiving payments. Use the 'Create new receiving address' button in the receive tab to create new addresses.
Signing is only possible with addresses of the type 'legacy'.</source>
        <translation type="unfinished">Ovo su vaše Bitcoin adrese za primanje sredstava. Koristite 'Kreiraj novu adresu za primanje' u tabu Primite kako biste kreirali nove adrese.
Potpisivanje je moguće samo sa 'legacy' adresama. </translation>
    </message>
    <message>
        <source>&amp;Copy Address</source>
        <translation type="unfinished">&amp;Kopirajte adresu</translation>
    </message>
    <message>
        <source>Copy &amp;Label</source>
        <translation type="unfinished">Kopirajte &amp;oznaku</translation>
    </message>
    <message>
        <source>&amp;Edit</source>
        <translation type="unfinished">&amp;Uredite</translation>
    </message>
    <message>
        <source>Export Address List</source>
        <translation type="unfinished">Izvezite listu adresa</translation>
    </message>
    <message>
        <source>Comma separated file</source>
        <extracomment>Expanded name of the CSV file format. See: https://en.wikipedia.org/wiki/Comma-separated_values.</extracomment>
        <translation type="unfinished">Datoteka podataka odvojenih zarezima (*.csv)</translation>
    </message>
    <message>
        <source>There was an error trying to save the address list to %1. Please try again.</source>
        <extracomment>An error message. %1 is a stand-in argument for the name of the file we attempted to save to.</extracomment>
        <translation type="unfinished">Došlo je do pogreške kod spremanja liste adresa na %1. Molimo pokušajte ponovno.</translation>
    </message>
    <message>
        <source>Exporting Failed</source>
        <translation type="unfinished">Izvoz neuspješan</translation>
    </message>
</context>
<context>
    <name>AddressTableModel</name>
    <message>
        <source>Label</source>
        <translation type="unfinished">Oznaka</translation>
    </message>
    <message>
        <source>Address</source>
        <translation type="unfinished">Adresa</translation>
    </message>
    <message>
        <source>(no label)</source>
        <translation type="unfinished">(nema oznake)</translation>
    </message>
</context>
<context>
    <name>AskPassphraseDialog</name>
    <message>
        <source>Passphrase Dialog</source>
        <translation type="unfinished">Dijalog lozinke</translation>
    </message>
    <message>
        <source>Enter passphrase</source>
        <translation type="unfinished">Unesite lozinku</translation>
    </message>
    <message>
        <source>New passphrase</source>
        <translation type="unfinished">Nova lozinka</translation>
    </message>
    <message>
        <source>Repeat new passphrase</source>
        <translation type="unfinished">Ponovite novu lozinku</translation>
    </message>
    <message>
        <source>Show passphrase</source>
        <translation type="unfinished">Pokažite lozinku</translation>
    </message>
    <message>
        <source>Encrypt wallet</source>
        <translation type="unfinished">Šifrirajte novčanik</translation>
    </message>
    <message>
        <source>This operation needs your wallet passphrase to unlock the wallet.</source>
        <translation type="unfinished">Ova operacija treba lozinku vašeg novčanika kako bi se novčanik otključao.</translation>
    </message>
    <message>
        <source>Unlock wallet</source>
        <translation type="unfinished">Otključajte novčanik</translation>
    </message>
    <message>
        <source>Change passphrase</source>
        <translation type="unfinished">Promijenite lozinku</translation>
    </message>
    <message>
        <source>Confirm wallet encryption</source>
        <translation type="unfinished">Potvrdite šifriranje novčanika</translation>
    </message>
    <message>
        <source>Warning: If you encrypt your wallet and lose your passphrase, you will &lt;b&gt;LOSE ALL OF YOUR BITCOINS&lt;/b&gt;!</source>
        <translation type="unfinished">Upozorenje: Ako šifrirate vaš novčanik i izgubite lozinku, &lt;b&gt;IZGUBIT ĆETE SVE SVOJE BITCOINE!&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Are you sure you wish to encrypt your wallet?</source>
        <translation type="unfinished">Jeste li sigurni da želite šifrirati svoj novčanik?</translation>
    </message>
    <message>
        <source>Wallet encrypted</source>
        <translation type="unfinished">Novčanik šifriran</translation>
    </message>
    <message>
        <source>Enter the new passphrase for the wallet.&lt;br/&gt;Please use a passphrase of &lt;b&gt;ten or more random characters&lt;/b&gt;, or &lt;b&gt;eight or more words&lt;/b&gt;.</source>
        <translation type="unfinished">Unesite novu lozinku za novčanik. &lt;br/&gt;Molimo vas da koristite zaporku od &lt;b&gt;deset ili više slučajnih znakova&lt;/b&gt;, ili &lt;b&gt;osam ili više riječi.&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Enter the old passphrase and new passphrase for the wallet.</source>
        <translation type="unfinished">Unesite staru i novu lozinku za novčanik.</translation>
    </message>
    <message>
        <source>Remember that encrypting your wallet cannot fully protect your bitcoins from being stolen by malware infecting your computer.</source>
        <translation type="unfinished">Zapamtite da šifriranje vašeg novčanika ne može u potpunosti zaštititi vaše bitcoinove od zloćudnog softvera kojim se zarazi vaše računalo.</translation>
    </message>
    <message>
        <source>Wallet to be encrypted</source>
        <translation type="unfinished">Novčanik koji treba šifrirati</translation>
    </message>
    <message>
        <source>Your wallet is about to be encrypted. </source>
        <translation type="unfinished">Vaš novčanik će biti šifriran.</translation>
    </message>
    <message>
        <source>Your wallet is now encrypted. </source>
        <translation type="unfinished">Vaš novčanik je sad šifriran.</translation>
    </message>
    <message>
        <source>IMPORTANT: Any previous backups you have made of your wallet file should be replaced with the newly generated, encrypted wallet file. For security reasons, previous backups of the unencrypted wallet file will become useless as soon as you start using the new, encrypted wallet.</source>
        <translation type="unfinished">VAŽNO: Sve prethodne pričuve vašeg novčanika trebale bi biti zamijenjene novo stvorenom, šifriranom datotekom novčanika. Zbog sigurnosnih razloga, prethodne pričuve nešifriranog novčanika će postati beskorisne čim počnete koristiti novi, šifrirani novčanik.</translation>
    </message>
    <message>
        <source>Wallet encryption failed</source>
        <translation type="unfinished">Šifriranje novčanika nije uspjelo</translation>
    </message>
    <message>
        <source>Wallet encryption failed due to an internal error. Your wallet was not encrypted.</source>
        <translation type="unfinished">Šifriranje novčanika nije uspjelo zbog interne pogreške. Vaš novčanik nije šifriran.</translation>
    </message>
    <message>
        <source>The supplied passphrases do not match.</source>
        <translation type="unfinished">Priložene lozinke se ne podudaraju.</translation>
    </message>
    <message>
        <source>Wallet unlock failed</source>
        <translation type="unfinished">Otključavanje novčanika nije uspjelo</translation>
    </message>
    <message>
        <source>The passphrase entered for the wallet decryption was incorrect.</source>
        <translation type="unfinished">Lozinka za dešifriranje novčanika nije točna.</translation>
    </message>
    <message>
        <source>Wallet passphrase was successfully changed.</source>
        <translation type="unfinished">Lozinka novčanika je uspješno promijenjena.</translation>
    </message>
    <message>
        <source>Warning: The Caps Lock key is on!</source>
        <translation type="unfinished">Upozorenje: Caps Lock je uključen!</translation>
    </message>
</context>
<context>
    <name>BanTableModel</name>
    <message>
        <source>IP/Netmask</source>
        <translation type="unfinished">IP/Mrežna maska</translation>
    </message>
    <message>
        <source>Banned Until</source>
        <translation type="unfinished">Zabranjen do</translation>
    </message>
</context>
<context>
    <name>BitcoinApplication</name>
    <message>
        <source>Runaway exception</source>
        <translation type="unfinished">Runaway iznimka</translation>
    </message>
    <message>
        <source>A fatal error occurred. %1 can no longer continue safely and will quit.</source>
        <translation type="unfinished">Dogodila se greška. %1 ne može sigurno nastaviti te će se zatvoriti.</translation>
    </message>
    <message>
        <source>Internal error</source>
        <translation type="unfinished">Interna greška</translation>
    </message>
    <message>
        <source>An internal error occurred. %1 will attempt to continue safely. This is an unexpected bug which can be reported as described below.</source>
        <translation type="unfinished">Dogodila se interna greška. %1 će pokušati sigurno nastaviti. Ovo je neočekivani bug koji se može prijaviti kao što je objašnjeno ispod.</translation>
    </message>
</context>
<context>
    <name>QObject</name>
    <message>
        <source>Do you want to reset settings to default values, or to abort without making changes?</source>
        <extracomment>Explanatory text shown on startup when the settings file cannot be read. Prompts user to make a choice between resetting or aborting.</extracomment>
        <translation type="unfinished">Želite li resetirati postavke na početne vrijednosti ili izaći bez promjena?</translation>
    </message>
    <message>
        <source>A fatal error occurred. Check that settings file is writable, or try running with -nosettings.</source>
        <extracomment>Explanatory text shown on startup when the settings file could not be written. Prompts user to check that we have the ability to write to the file. Explains that the user has the option of running without a settings file.</extracomment>
        <translation type="unfinished">Dogodila se kobna greška. Provjerite je li datoteka za postavke otvorena za promjene ili pokušajte pokrenuti s -nosettings.</translation>
    </message>
    <message>
        <source>Error: %1</source>
        <translation type="unfinished">Greška: %1</translation>
    </message>
    <message>
        <source>%1 didn't yet exit safely…</source>
        <translation type="unfinished">%1 se nije još zatvorio na siguran način.</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation type="unfinished">nepoznato</translation>
    </message>
    <message>
        <source>Amount</source>
        <translation type="unfinished">Iznos</translation>
    </message>
    <message>
        <source>Enter a Bitcoin address (e.g. %1)</source>
        <translation type="unfinished">Unesite Bitcoin adresu (npr. %1)</translation>
    </message>
    <message>
        <source>Unroutable</source>
        <translation type="unfinished">Neusmjeriv</translation>
    </message>
    <message>
        <source>IPv4</source>
        <comment>network name</comment>
        <extracomment>Name of IPv4 network in peer info</extracomment>
        <translation type="unfinished">IPv4-a</translation>
    </message>
    <message>
        <source>IPv6</source>
        <comment>network name</comment>
        <extracomment>Name of IPv6 network in peer info</extracomment>
        <translation type="unfinished">IPv6-a</translation>
    </message>
    <message>
        <source>Inbound</source>
        <extracomment>An inbound connection from a peer. An inbound connection is a connection initiated by a peer.</extracomment>
        <translation type="unfinished">Dolazni</translation>
    </message>
    <message>
        <source>Outbound</source>
        <extracomment>An outbound connection to a peer. An outbound connection is a connection initiated by us.</extracomment>
        <translation type="unfinished">Izlazni</translation>
    </message>
    <message>
        <source>Full Relay</source>
        <extracomment>Peer connection type that relays all network information.</extracomment>
        <translation type="unfinished">Potpuni prijenos</translation>
    </message>
    <message>
        <source>Block Relay</source>
        <extracomment>Peer connection type that relays network information about blocks and not transactions or addresses.</extracomment>
        <translation type="unfinished">Blok prijenos</translation>
    </message>
    <message>
        <source>Manual</source>
        <extracomment>Peer connection type established manually through one of several methods.</extracomment>
        <translation type="unfinished">Priručnik</translation>
    </message>
    <message>
        <source>Feeler</source>
        <extracomment>Short-lived peer connection type that tests the aliveness of known addresses.</extracomment>
        <translation type="unfinished">Ispipavač</translation>
    </message>
    <message>
        <source>Address Fetch</source>
        <extracomment>Short-lived peer connection type that solicits known addresses from a peer.</extracomment>
        <translation type="unfinished">Dohvaćanje adrese</translation>
    </message>
    <message>
        <source>None</source>
        <translation type="unfinished">Ništa</translation>
    </message>
    <message numerus="yes">
        <source>%n second(s)</source>
        <translation type="unfinished">
            <numerusform>%n second(s)</numerusform>
            <numerusform>%n second(s)</numerusform>
            <numerusform>%n sekundi</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <source>%n minute(s)</source>
        <translation type="unfinished">
            <numerusform>%n minute(s)</numerusform>
            <numerusform>%n minute(s)</numerusform>
            <numerusform>%n minuta</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <source>%n hour(s)</source>
        <translation type="unfinished">
            <numerusform>%n hour(s)</numerusform>
            <numerusform>%n hour(s)</numerusform>
            <numerusform>%n sati</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <source>%n day(s)</source>
        <translation type="unfinished">
            <numerusform>%n day(s)</numerusform>
            <numerusform>%n day(s)</numerusform>
            <numerusform>%n dana</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <source>%n week(s)</source>
        <translation type="unfinished">
            <numerusform>%n week(s)</numerusform>
            <numerusform>%n week(s)</numerusform>
            <numerusform>%n tjedana</numerusform>
        </translation>
    </message>
    <message>
        <source>%1 and %2</source>
        <translation type="unfinished">%1 i %2</translation>
    </message>
    <message numerus="yes">
        <source>%n year(s)</source>
        <translation type="unfinished">
            <numerusform>%n year(s)</numerusform>
            <numerusform>%n year(s)</numerusform>
            <numerusform>%n godina</numerusform>
        </translation>
    </message>
    </context>
<context>
    <name>BitcoinGUI</name>
    <message>
        <source>&amp;Overview</source>
        <translation type="unfinished">&amp;Pregled</translation>
    </message>
    <message>
        <source>Show general overview of wallet</source>
        <translation type="unfinished">Prikaži opći pregled novčanika</translation>
    </message>
    <message>
        <source>&amp;Transactions</source>
        <translation type="unfinished">&amp;Transakcije</translation>
    </message>
    <message>
        <source>Browse transaction history</source>
        <translation type="unfinished">Pretražite povijest transakcija</translation>
    </message>
    <message>
        <source>E&amp;xit</source>
        <translation type="unfinished">&amp;Izlaz</translation>
    </message>
    <message>
        <source>Quit application</source>
        <translation type="unfinished">Zatvorite aplikaciju</translation>
    </message>
    <message>
        <source>&amp;About %1</source>
        <translation type="unfinished">&amp;Više o %1</translation>
    </message>
    <message>
        <source>Show information about %1</source>
        <translation type="unfinished">Prikažite informacije o programu %1</translation>
    </message>
    <message>
        <source>About &amp;Qt</source>
        <translation type="unfinished">Više o &amp;Qt</translation>
    </message>
    <message>
        <source>Show information about Qt</source>
        <translation type="unfinished">Prikažite informacije o Qt</translation>
    </message>
    <message>
        <source>Modify configuration options for %1</source>
        <translation type="unfinished">Promijenite postavke za %1</translation>
    </message>
    <message>
        <source>Create a new wallet</source>
        <translation type="unfinished">Stvorite novi novčanik</translation>
    </message>
    <message>
        <source>&amp;Minimize</source>
        <translation type="unfinished">&amp;Minimiziraj</translation>
    </message>
    <message>
        <source>Wallet:</source>
        <translation type="unfinished">Novčanik:</translation>
    </message>
    <message>
        <source>Network activity disabled.</source>
        <extracomment>A substring of the tooltip.</extracomment>
        <translation type="unfinished">Mrežna aktivnost isključena.</translation>
    </message>
    <message>
        <source>Proxy is &lt;b&gt;enabled&lt;/b&gt;: %1</source>
        <translation type="unfinished">Proxy je &lt;b&gt;uključen&lt;/b&gt;: %1</translation>
    </message>
    <message>
        <source>Send coins to a Bitcoin address</source>
        <translation type="unfinished">Pošaljite novac na Bitcoin adresu</translation>
    </message>
    <message>
        <source>Backup wallet to another location</source>
        <translation type="unfinished">Napravite sigurnosnu kopiju novčanika na drugoj lokaciji</translation>
    </message>
    <message>
        <source>Change the passphrase used for wallet encryption</source>
        <translation type="unfinished">Promijenite lozinku za šifriranje novčanika</translation>
    </message>
    <message>
        <source>&amp;Send</source>
        <translation type="unfinished">&amp;Pošaljite</translation>
    </message>
    <message>
        <source>&amp;Receive</source>
        <translation type="unfinished">Pri&amp;mite</translation>
    </message>
    <message>
        <source>&amp;Options…</source>
        <translation type="unfinished">&amp;Postavke</translation>
    </message>
    <message>
        <source>&amp;Encrypt Wallet…</source>
        <translation type="unfinished">&amp;Šifriraj novčanik</translation>
    </message>
    <message>
        <source>Encrypt the private keys that belong to your wallet</source>
        <translation type="unfinished">Šifrirajte privatne ključeve u novčaniku</translation>
    </message>
    <message>
        <source>&amp;Backup Wallet…</source>
        <translation type="unfinished">&amp;Kreiraj sigurnosnu kopiju novčanika</translation>
    </message>
    <message>
        <source>&amp;Change Passphrase…</source>
        <translation type="unfinished">&amp;Promijeni lozinku</translation>
    </message>
    <message>
        <source>Sign &amp;message…</source>
        <translation type="unfinished">Potpiši &amp;poruku</translation>
    </message>
    <message>
        <source>Sign messages with your Bitcoin addresses to prove you own them</source>
        <translation type="unfinished">Poruku potpišemo s Bitcoin adresom, kako bi dokazali vlasništvo nad tom adresom</translation>
    </message>
    <message>
        <source>&amp;Verify message…</source>
        <translation type="unfinished">&amp;Potvrdi poruku</translation>
    </message>
    <message>
        <source>Verify messages to ensure they were signed with specified Bitcoin addresses</source>
        <translation type="unfinished">Provjerite poruku da je potpisana s navedenom Bitcoin adresom</translation>
    </message>
    <message>
        <source>&amp;Load PSBT from file…</source>
        <translation type="unfinished">&amp;Učitaj PSBT iz datoteke</translation>
    </message>
    <message>
        <source>Open &amp;URI…</source>
        <translation type="unfinished">Otvori &amp;URI adresu...</translation>
    </message>
    <message>
        <source>Close Wallet…</source>
        <translation type="unfinished">Zatvori novčanik...</translation>
    </message>
    <message>
        <source>Create Wallet…</source>
        <translation type="unfinished">Kreiraj novčanik...</translation>
    </message>
    <message>
        <source>Close All Wallets…</source>
        <translation type="unfinished">Zatvori sve novčanike...</translation>
    </message>
    <message>
        <source>&amp;File</source>
        <translation type="unfinished">&amp;Datoteka</translation>
    </message>
    <message>
        <source>&amp;Settings</source>
        <translation type="unfinished">&amp;Postavke</translation>
    </message>
    <message>
        <source>&amp;Help</source>
        <translation type="unfinished">&amp;Pomoć</translation>
    </message>
    <message>
        <source>Tabs toolbar</source>
        <translation type="unfinished">Traka kartica</translation>
    </message>
    <message>
        <source>Syncing Headers (%1%)…</source>
        <translation type="unfinished">Sinkronizacija zaglavlja bloka (%1%)...</translation>
    </message>
    <message>
        <source>Synchronizing with network…</source>
        <translation type="unfinished">Sinkronizacija s mrežom...</translation>
    </message>
    <message>
        <source>Indexing blocks on disk…</source>
        <translation type="unfinished">Indeksiranje blokova na disku...</translation>
    </message>
    <message>
        <source>Processing blocks on disk…</source>
        <translation type="unfinished">Procesuiranje blokova na disku...</translation>
    </message>
    <message>
        <source>Connecting to peers…</source>
        <translation type="unfinished">Povezivanje sa peer-ovima...</translation>
    </message>
    <message>
        <source>Request payments (generates QR codes and bitcoin: URIs)</source>
        <translation type="unfinished">Zatražite uplatu (stvara QR kod i bitcoin: URI adresu)</translation>
    </message>
    <message>
        <source>Show the list of used sending addresses and labels</source>
        <translation type="unfinished">Prikažite popis korištenih adresa i oznaka za slanje novca</translation>
    </message>
    <message>
        <source>Show the list of used receiving addresses and labels</source>
        <translation type="unfinished">Prikažite popis korištenih adresa i oznaka za primanje novca</translation>
    </message>
    <message>
        <source>&amp;Command-line options</source>
        <translation type="unfinished">Opcije &amp;naredbene linije</translation>
    </message>
    <message numerus="yes">
        <source>Processed %n block(s) of transaction history.</source>
        <translation type="unfinished">
            <numerusform>Processed %n block(s) of transaction history.</numerusform>
            <numerusform>Processed %n block(s) of transaction history.</numerusform>
            <numerusform>Obrađeno %n blokova povijesti transakcije.</numerusform>
        </translation>
    </message>
    <message>
        <source>%1 behind</source>
        <translation type="unfinished">%1 iza</translation>
    </message>
    <message>
        <source>Catching up…</source>
        <translation type="unfinished">Ažuriranje...</translation>
    </message>
    <message>
        <source>Last received block was generated %1 ago.</source>
        <translation type="unfinished">Zadnji primljeni blok je bio ustvaren prije %1.</translation>
    </message>
    <message>
        <source>Transactions after this will not yet be visible.</source>
        <translation type="unfinished">Transakcije izvršene za tim blokom nisu još prikazane.</translation>
    </message>
    <message>
        <source>Error</source>
        <translation type="unfinished">Greška</translation>
    </message>
    <message>
        <source>Warning</source>
        <translation type="unfinished">Upozorenje</translation>
    </message>
    <message>
        <source>Information</source>
        <translation type="unfinished">Informacija</translation>
    </message>
    <message>
        <source>Up to date</source>
        <translation type="unfinished">Ažurno</translation>
    </message>
    <message>
        <source>Load Partially Signed Bitcoin Transaction</source>
        <translation type="unfinished">Učitaj djelomično potpisanu bitcoin transakciju</translation>
    </message>
    <message>
        <source>Load PSBT from &amp;clipboard…</source>
        <translation type="unfinished">Učitaj PSBT iz &amp;međuspremnika...</translation>
    </message>
    <message>
        <source>Load Partially Signed Bitcoin Transaction from clipboard</source>
        <translation type="unfinished">Učitaj djelomično potpisanu bitcoin transakciju iz međuspremnika</translation>
    </message>
    <message>
        <source>Node window</source>
        <translation type="unfinished">Konzola za čvor</translation>
    </message>
    <message>
        <source>Open node debugging and diagnostic console</source>
        <translation type="unfinished">Otvori konzolu za dijagnostiku i otklanjanje pogrešaka čvora.</translation>
    </message>
    <message>
        <source>&amp;Sending addresses</source>
        <translation type="unfinished">Adrese za &amp;slanje</translation>
    </message>
    <message>
        <source>&amp;Receiving addresses</source>
        <translation type="unfinished">Adrese za &amp;primanje</translation>
    </message>
    <message>
        <source>Open a bitcoin: URI</source>
        <translation type="unfinished">Otvori bitcoin: URI</translation>
    </message>
    <message>
        <source>Open Wallet</source>
        <translation type="unfinished">Otvorite novčanik</translation>
    </message>
    <message>
        <source>Open a wallet</source>
        <translation type="unfinished">Otvorite neki novčanik</translation>
    </message>
    <message>
        <source>Close wallet</source>
        <translation type="unfinished">Zatvorite novčanik</translation>
    </message>
    <message>
        <source>Close all wallets</source>
        <translation type="unfinished">Zatvori sve novčanike</translation>
    </message>
    <message>
        <source>Show the %1 help message to get a list with possible Bitcoin command-line options</source>
        <translation type="unfinished">Prikažite pomoć programa %1 kako biste ispisali moguće opcije preko terminala</translation>
    </message>
    <message>
        <source>&amp;Mask values</source>
        <translation type="unfinished">&amp;Sakrij vrijednosti</translation>
    </message>
    <message>
        <source>Mask the values in the Overview tab</source>
        <translation type="unfinished">Sakrij vrijednost u tabu Pregled </translation>
    </message>
    <message>
        <source>default wallet</source>
        <translation type="unfinished">uobičajeni novčanik</translation>
    </message>
    <message>
        <source>No wallets available</source>
        <translation type="unfinished">Nema dostupnih novčanika</translation>
    </message>
    <message>
        <source>Wallet Data</source>
        <extracomment>Name of the wallet data file format.</extracomment>
        <translation type="unfinished">Podaci novčanika</translation>
    </message>
    <message>
        <source>Wallet Name</source>
        <extracomment>Label of the input field where the name of the wallet is entered.</extracomment>
        <translation type="unfinished">Ime novčanika</translation>
    </message>
    <message>
        <source>&amp;Window</source>
        <translation type="unfinished">&amp;Prozor</translation>
    </message>
    <message>
        <source>Zoom</source>
        <translation type="unfinished">Povećajte</translation>
    </message>
    <message>
        <source>Main Window</source>
        <translation type="unfinished">Glavni prozor</translation>
    </message>
    <message>
        <source>%1 client</source>
        <translation type="unfinished">%1 klijent</translation>
    </message>
    <message>
        <source>&amp;Hide</source>
        <translation type="unfinished">&amp;Sakrij</translation>
    </message>
    <message>
        <source>S&amp;how</source>
        <translation type="unfinished">&amp;Pokaži</translation>
    </message>
    <message numerus="yes">
        <source>%n active connection(s) to Bitcoin network.</source>
        <extracomment>A substring of the tooltip.</extracomment>
        <translation type="unfinished">
            <numerusform>%n active connection(s) to Bitcoin network.</numerusform>
            <numerusform>%n active connection(s) to Bitcoin network.</numerusform>
            <numerusform>%n aktivnih veza s Bitcoin mrežom.</numerusform>
        </translation>
    </message>
    <message>
        <source>Click for more actions.</source>
        <extracomment>A substring of the tooltip. "More actions" are available via the context menu.</extracomment>
        <translation type="unfinished">Klikni za više radnji.</translation>
    </message>
    <message>
        <source>Show Peers tab</source>
        <extracomment>A context menu item. The "Peers tab" is an element of the "Node window".</extracomment>
        <translation type="unfinished">Pokaži Peers tab </translation>
    </message>
    <message>
        <source>Disable network activity</source>
        <extracomment>A context menu item.</extracomment>
        <translation type="unfinished">Onemogući mrežnu aktivnost</translation>
    </message>
    <message>
        <source>Enable network activity</source>
        <extracomment>A context menu item. The network activity was disabled previously.</extracomment>
        <translation type="unfinished">Omogući mrežnu aktivnost</translation>
    </message>
    <message>
        <source>Error: %1</source>
        <translation type="unfinished">Greška: %1</translation>
    </message>
    <message>
        <source>Warning: %1</source>
        <translation type="unfinished">Upozorenje: %1</translation>
    </message>
    <message>
        <source>Date: %1
</source>
        <translation type="unfinished">Datum: %1
</translation>
    </message>
    <message>
        <source>Amount: %1
</source>
        <translation type="unfinished">Iznos: %1
</translation>
    </message>
    <message>
        <source>Wallet: %1
</source>
        <translation type="unfinished">Novčanik: %1
</translation>
    </message>
    <message>
        <source>Type: %1
</source>
        <translation type="unfinished">Vrsta: %1
</translation>
    </message>
    <message>
        <source>Label: %1
</source>
        <translation type="unfinished">Oznaka: %1
</translation>
    </message>
    <message>
        <source>Address: %1
</source>
        <translation type="unfinished">Adresa: %1
</translation>
    </message>
    <message>
        <source>Sent transaction</source>
        <translation type="unfinished">Poslana transakcija</translation>
    </message>
    <message>
        <source>Incoming transaction</source>
        <translation type="unfinished">Dolazna transakcija</translation>
    </message>
    <message>
        <source>HD key generation is &lt;b&gt;enabled&lt;/b&gt;</source>
        <translation type="unfinished">Generiranje HD ključeva je &lt;b&gt;uključeno&lt;/b&gt;</translation>
    </message>
    <message>
        <source>HD key generation is &lt;b&gt;disabled&lt;/b&gt;</source>
        <translation type="unfinished">Generiranje HD ključeva je &lt;b&gt;isključeno&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Private key &lt;b&gt;disabled&lt;/b&gt;</source>
        <translation type="unfinished">Privatni ključ &lt;b&gt;onemogućen&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Wallet is &lt;b&gt;encrypted&lt;/b&gt; and currently &lt;b&gt;unlocked&lt;/b&gt;</source>
        <translation type="unfinished">Novčanik je &lt;b&gt;šifriran&lt;/b&gt; i trenutno &lt;b&gt;otključan&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Wallet is &lt;b&gt;encrypted&lt;/b&gt; and currently &lt;b&gt;locked&lt;/b&gt;</source>
        <translation type="unfinished">Novčanik je &lt;b&gt;šifriran&lt;/b&gt; i trenutno &lt;b&gt;zaključan&lt;/b&gt;</translation>
    </message>
    <message>
        <source>Original message:</source>
        <translation type="unfinished">Originalna poruka:</translation>
    </message>
</context>
<context>
    <name>UnitDisplayStatusBarControl</name>
    <message>
        <source>Unit to show amounts in. Click to select another unit.</source>
        <translation type="unfinished">Jedinica u kojoj ćete prikazati iznose. Kliknite da izabrate drugu jedinicu.</translation>
    </message>
</context>
<context>
    <name>CoinControlDialog</name>
    <message>
        <source>Coin Selection</source>
        <translation type="unfinished">Izbor ulaza transakcije</translation>
    </message>
    <message>
        <source>Quantity:</source>
        <translation type="unfinished">Količina:</translation>
    </message>
    <message>
        <source>Bytes:</source>
        <translation type="unfinished">Bajtova:</translation>
    </message>
    <message>
        <source>Amount:</source>
        <translation type="unfinished">Iznos:</translation>
    </message>
    <message>
        <source>Fee:</source>
        <translation type="unfinished">Naknada:</translation>
    </message>
    <message>
        <source>Dust:</source>
        <translation type="unfinished">Prah:</translation>
    </message>
    <message>
        <source>After Fee:</source>
        <translation type="unfinished">Nakon naknade:</translation>
    </message>
    <message>
        <source>Change:</source>
        <translation type="unfinished">Vraćeno:</translation>
    </message>
    <message>
        <source>(un)select all</source>
        <translation type="unfinished">Izaberi sve/ništa</translation>
    </message>
    <message>
        <source>Tree mode</source>
        <translation type="unfinished">Prikažite kao stablo</translation>
    </message>
    <message>
        <source>List mode</source>
        <translation type="unfinished">Prikažite kao listu</translation>
    </message>
    <message>
        <source>Amount</source>
        <translation type="unfinished">Iznos</translation>
    </message>
    <message>
        <source>Received with label</source>
        <translation type="unfinished">Primljeno pod oznakom</translation>
    </message>
    <message>
        <source>Received with address</source>
        <translation type="unfinished">Primljeno na adresu</translation>
    </message>
    <message>
        <source>Date</source>
        <translation type="unfinished">Datum</translation>
    </message>
    <message>
        <source>Confirmations</source>
        <translation type="unfinished">Broj potvrda</translation>
    </message>
    <message>
        <source>Confirmed</source>
        <translation type="unfinished">Potvrđeno</translation>
    </message>
    <message>
        <source>Copy amount</source>
        <translation type="unfinished">Kopirajte iznos</translation>
    </message>
    <message>
        <source>&amp;Copy address</source>
        <translation type="unfinished">&amp;Kopiraj adresu</translation>
    </message>
    <message>
        <source>Copy &amp;label</source>
        <translation type="unfinished">Kopiraj &amp;oznaku</translation>
    </message>
    <message>
        <source>Copy &amp;amount</source>
        <translation type="unfinished">Kopiraj &amp;iznos</translation>
    </message>
    <message>
        <source>Copy transaction &amp;ID and output index</source>
        <translation type="unfinished">Kopiraj &amp;ID transakcije i output index</translation>
    </message>
    <message>
        <source>L&amp;ock unspent</source>
        <translation type="unfinished">&amp;Zaključaj nepotrošen input</translation>
    </message>
    <message>
        <source>&amp;Unlock unspent</source>
        <translation type="unfinished">&amp;Otključaj nepotrošen input</translation>
    </message>
    <message>
        <source>Copy quantity</source>
        <translation type="unfinished">Kopirajte iznos</translation>
    </message>
    <message>
        <source>Copy fee</source>
        <translation type="unfinished">Kopirajte naknadu</translation>
    </message>
    <message>
        <source>Copy after fee</source>
        <translation type="unfinished">Kopirajte iznos nakon naknade</translation>
    </message>
    <message>
        <source>Copy bytes</source>
        <translation type="unfinished">Kopirajte količinu bajtova</translation>
    </message>
    <message>
        <source>Copy dust</source>
        <translation type="unfinished">Kopirajte sićušne iznose ("prašinu")</translation>
    </message>
    <message>
        <source>Copy change</source>
        <translation type="unfinished">Kopirajte ostatak</translation>
    </message>
    <message>
        <source>(%1 locked)</source>
        <translation type="unfinished">(%1 zaključen)</translation>
    </message>
    <message>
        <source>yes</source>
        <translation type="unfinished">da</translation>
    </message>
    <message>
        <source>no</source>
        <translation type="unfinished">ne</translation>
    </message>
    <message>
        <source>This label turns red if any recipient receives an amount smaller than the current dust threshold.</source>
        <translation type="unfinished">Oznaka postane crvene boje ako bilo koji primatelj dobije iznos manji od trenutnog praga "prašine" (sićušnog iznosa).</translation>
    </message>
    <message>
        <source>Can vary +/- %1 satoshi(s) per input.</source>
        <translation type="unfinished">Može varirati +/- %1 satoši(ja) po inputu.</translation>
    </message>
    <message>
        <source>(no label)</source>
        <translation type="unfinished">(nema oznake)</translation>
    </message>
    <message>
        <source>change from %1 (%2)</source>
        <translation type="unfinished">ostatak od %1 (%2)</translation>
    </message>
    <message>
        <source>(change)</source>
        <translation type="unfinished">(ostatak)</translation>
    </message>
</context>
<context>
    <name>CreateWalletActivity</name>
    <message>
        <source>Create Wallet</source>
        <extracomment>Title of window indicating the progress of creation of a new wallet.</extracomment>
        <translation type="unfinished">Stvorite novčanik</translation>
    </message>
    <message>
        <source>Creating Wallet &lt;b&gt;%1&lt;/b&gt;…</source>
        <extracomment>Descriptive text of the create wallet progress window which indicates to the user which wallet is currently being created.</extracomment>
        <translation type="unfinished">Kreiranje novčanika &lt;b&gt;%1&lt;/b&gt;...</translation>
    </message>
    <message>
        <source>Create wallet failed</source>
        <translation type="unfinished">Neuspješno stvaranje novčanika</translation>
    </message>
    <message>
        <source>Create wallet warning</source>
        <translation type="unfinished">Upozorenje kod stvaranja novčanika</translation>
    </message>
    <message>
        <source>Can't list signers</source>
        <translation type="unfinished">Nije moguće izlistati potpisnike</translation>
    </message>
    </context>
<context>
    <name>LoadWalletsActivity</name>
    <message>
        <source>Load Wallets</source>
        <extracomment>Title of progress window which is displayed when wallets are being loaded.</extracomment>
        <translation type="unfinished">Učitaj novčanike</translation>
    </message>
    <message>
        <source>Loading wallets…</source>
        <extracomment>Descriptive text of the load wallets progress window which indicates to the user that wallets are currently being loaded.</extracomment>
        <translation type="unfinished">Učitavanje novčanika...</translation>
    </message>
</context>
<context>
    <name>OpenWalletActivity</name>
    <message>
        <source>Open wallet failed</source>
        <translation type="unfinished">Neuspješno otvaranje novčanika</translation>
    </message>
    <message>
        <source>Open wallet warning</source>
        <translation type="unfinished">Upozorenje kod otvaranja novčanika</translation>
    </message>
    <message>
        <source>default wallet</source>
        <translation type="unfinished">uobičajeni novčanik</translation>
    </message>
    <message>
        <source>Open Wallet</source>
        <extracomment>Title of window indicating the progress of opening of a wallet.</extracomment>
        <translation type="unfinished">Otvorite novčanik</translation>
    </message>
    <message>
        <source>Opening Wallet &lt;b&gt;%1&lt;/b&gt;…</source>
        <extracomment>Descriptive text of the open wallet progress window which indicates to the user which wallet is currently being opened.</extracomment>
        <translation type="unfinished">Otvaranje novčanika &lt;b&gt;%1&lt;/b&gt;...</translation>
    </message>
</context>
<context>
    <name>WalletController</name>
    <message>
        <source>Close wallet</source>
        <translation type="unfinished">Zatvorite novčanik</translation>
    </message>
    <message>
        <source>Are you sure you wish to close the wallet &lt;i&gt;%1&lt;/i&gt;?</source>
        <translation type="unfinished">Jeste li sigurni da želite zatvoriti novčanik &lt;i&gt;%1&lt;/i&gt;?</translation>
    </message>
    <message>
        <source>Closing the wallet for too long can result in having to resync the entire chain if pruning is enabled.</source>
        <translation type="unfinished">Držanje novčanik zatvorenim predugo može rezultirati ponovnom sinkronizacijom cijelog lanca ako je uključen pruning (odbacivanje dijela podataka).</translation>
    </message>
    <message>
        <source>Close all wallets</source>
        <translation type="unfinished">Zatvori sve novčanike</translation>
    </message>
    <message>
        <source>Are you sure you wish to close all wallets?</source>
        <translation type="unfinished">Jeste li sigurni da želite zatvoriti sve novčanike?</translation>
    </message>
</context>
<context>
    <name>CreateWalletDialog</name>
    <message>
        <source>Create Wallet</source>
        <translation type="unfinished">Stvorite novčanik</translation>
    </message>
    <message>
        <source>Wallet Name</source>
        <translation type="unfinished">Ime novčanika</translation>
    </message>
    <message>
        <source>Wallet</source>
        <translation type="unfinished">Novčanik</translation>
    </message>
    <message>
        <source>Encrypt the wallet. The wallet will be encrypted with a passphrase of your choice.</source>
        <translation type="unfinished">Šifrirajte novčanik. Novčanik bit će šifriran lozinkom po vašem izboru.</translation>
    </message>
    <message>
        <source>Encrypt Wallet</source>
        <translation type="unfinished">Šifrirajte novčanik</translation>
    </message>
    <message>
        <source>Advanced Options</source>
        <translation type="unfinished">Napredne opcije</translation>
    </message>
    <message>
        <source>Disable private keys for this wallet. Wallets with private keys disabled will have no private keys and cannot have an HD seed or imported private keys. This is ideal for watch-only wallets.</source>
        <translation type="unfinished">Isključite privatne ključeve za ovaj novčanik. Novčanici gdje su privatni ključevi isključeni neće sadržati privatne ključeve te ne mogu imati HD sjeme ili uvezene privatne ključeve. Ova postavka je idealna za novčanike koje su isključivo za promatranje.</translation>
    </message>
    <message>
        <source>Disable Private Keys</source>
        <translation type="unfinished">Isključite privatne ključeve</translation>
    </message>
    <message>
        <source>Make a blank wallet. Blank wallets do not initially have private keys or scripts. Private keys and addresses can be imported, or an HD seed can be set, at a later time.</source>
        <translation type="unfinished">Stvorite prazni novčanik. Prazni novčanici nemaju privatnih ključeva ili skripta. Mogu se naknadno uvesti privatne ključeve i adrese ili postaviti HD sjeme.</translation>
    </message>
    <message>
        <source>Make Blank Wallet</source>
        <translation type="unfinished">Stvorite prazni novčanik</translation>
    </message>
    <message>
        <source>Use descriptors for scriptPubKey management</source>
        <translation type="unfinished">Koristi deskriptore za upravljanje scriptPubKey-a</translation>
    </message>
    <message>
        <source>Descriptor Wallet</source>
        <translation type="unfinished">Deskriptor novčanik</translation>
    </message>
    <message>
        <source>Use an external signing device such as a hardware wallet. Configure the external signer script in wallet preferences first.</source>
        <translation type="unfinished">Koristi vanjski potpisni uređaj kao što je hardverski novčanik.  Prije korištenja konfiguriraj vanjski potpisni skript u postavkama novčanika.</translation>
    </message>
    <message>
        <source>External signer</source>
        <translation type="unfinished">Vanjski potpisnik</translation>
    </message>
    <message>
        <source>Create</source>
        <translation type="unfinished">Stvorite</translation>
    </message>
    <message>
        <source>Compiled without sqlite support (required for descriptor wallets)</source>
        <translation type="unfinished">Kompajlirano bez sqlite mogućnosti (potrebno za deskriptor novčanike)</translation>
    </message>
    <message>
        <source>Compiled without external signing support (required for external signing)</source>
        <extracomment>"External signing" means using devices such as hardware wallets.</extracomment>
        <translation type="unfinished">Kompajlirano bez mogućnosti vanjskog potpisivanje (potrebno za vanjsko potpisivanje)</translation>
    </message>
</context>
<context>
    <name>EditAddressDialog</name>
    <message>
        <source>Edit Address</source>
        <translation type="unfinished">Uredite adresu</translation>
    </message>
    <message>
        <source>&amp;Label</source>
        <translation type="unfinished">&amp;Oznaka</translation>
    </message>
    <message>
        <source>The label associated with this address list entry</source>
        <translation type="unfinished">Oznaka ovog zapisa u adresaru</translation>
    </message>
    <message>
        <source>The address associated with this address list entry. This can only be modified for sending addresses.</source>
        <translation type="unfinished">Adresa ovog zapisa u adresaru. Može se mijenjati samo kod adresa za slanje.</translation>
    </message>
    <message>
        <source>&amp;Address</source>
        <translation type="unfinished">&amp;Adresa</translation>
    </message>
    <message>
        <source>New sending address</source>
        <translation type="unfinished">Nova adresa za slanje</translation>
    </message>
    <message>
        <source>Edit receiving address</source>
        <translation type="unfinished">Uredi adresu za primanje</translation>
    </message>
    <message>
        <source>Edit sending address</source>
        <translation type="unfinished">Uredi adresu za slanje</translation>
    </message>
    <message>
        <source>The entered address "%1" is not a valid Bitcoin address.</source>
        <translation type="unfinished">Upisana adresa "%1" nije valjana Bitcoin adresa.</translation>
    </message>
    <message>
        <source>Address "%1" already exists as a receiving address with label "%2" and so cannot be added as a sending address.</source>
        <translation type="unfinished">Adresa "%1" već postoji kao primateljska adresa s oznakom "%2" te se ne može dodati kao pošiljateljska adresa.</translation>
    </message>
    <message>
        <source>The entered address "%1" is already in the address book with label "%2".</source>
        <translation type="unfinished">Unesena adresa "%1" postoji već u imeniku pod oznakom "%2".</translation>
    </message>
    <message>
        <source>Could not unlock wallet.</source>
        <translation type="unfinished">Ne može se otključati novčanik.</translation>
    </message>
    <message>
        <source>New key generation failed.</source>
        <translation type="unfinished">Stvaranje novog ključa nije uspjelo.</translation>
    </message>
</context>
<context>
    <name>FreespaceChecker</name>
    <message>
        <source>A new data directory will be created.</source>
        <translation type="unfinished">Biti će stvorena nova podatkovna mapa.</translation>
    </message>
    <message>
        <source>name</source>
        <translation type="unfinished">ime</translation>
    </message>
    <message>
        <source>Directory already exists. Add %1 if you intend to create a new directory here.</source>
        <translation type="unfinished">Mapa već postoji. Dodajte %1 ako namjeravate stvoriti novu mapu ovdje.</translation>
    </message>
    <message>
        <source>Path already exists, and is not a directory.</source>
        <translation type="unfinished">Put već postoji i nije mapa.</translation>
    </message>
    <message>
        <source>Cannot create data directory here.</source>
        <translation type="unfinished">Nije moguće stvoriti direktorij za podatke na tom mjestu.</translation>
    </message>
</context>
<context>
    <name>Intro</name>
    <message numerus="yes">
        <source>%n GB of space available</source>
        <translation type="unfinished">
            <numerusform />
            <numerusform />
            <numerusform />
        </translation>
    </message>
    <message numerus="yes">
        <source>(of %n GB needed)</source>
        <translation type="unfinished">
            <numerusform>(od potrebnog prostora od %n GB)</numerusform>
            <numerusform>(od potrebnog prostora od %n GB)</numerusform>
            <numerusform>(od potrebnog %n GB)</numerusform>
        </translation>
    </message>
    <message numerus="yes">
        <source>(%n GB needed for full chain)</source>
        <translation type="unfinished">
            <numerusform>(potreban je %n GB za cijeli lanac)</numerusform>
            <numerusform>(potrebna su %n GB-a za cijeli lanac)</numerusform>
            <numerusform>(potrebno je %n GB-a za cijeli lanac)</numerusform>
        </translation>
    </message>
    <message>
        <source>At least %1 GB of data will be stored in this directory, and it will grow over time.</source>
        <translation type="unfinished">Bit će spremljeno barem %1 GB podataka u ovoj mapi te će se povećati tijekom vremena.</translation>
    </message>
    <message>
        <source>Approximately %1 GB of data will be stored in this directory.</source>
        <translation type="unfinished">Otprilike %1 GB podataka bit će spremljeno u ovoj mapi.</translation>
    </message>
    <message numerus="yes">
        <source>(sufficient to restore backups %n day(s) old)</source>
        <extracomment>Explanatory text on the capability of the current prune target.</extracomment>
        <translation type="unfinished">
            <numerusform>(sufficient to restore backups %n day(s) old)</numerusform>
            <numerusform>(sufficient to restore backups %n day(s) old)</numerusform>
            <numerusform>(dovoljno za vraćanje sigurnosne kopije stare %n dan(a))</numerusform>
        </translation>
    </message>
    <message>
        <source>%1 will download and store a copy of the Bitcoin block chain.</source>
        <translation type="unfinished">%1 preuzet će i pohraniti kopiju Bitcoinovog lanca blokova.</translation>
    </message>
    <message>
        <source>The wallet will also be stored in this directory.</source>
        <translation type="unfinished">Novčanik bit će pohranjen u ovoj mapi.</translation>
    </message>
    <message>
        <source>Error: Specified data directory "%1" cannot be created.</source>
        <translation type="unfinished">Greška: Zadana podatkovna mapa "%1" ne može biti stvorena.</translation>
    </message>
    <message>
        <source>Error</source>
        <translation type="unfinished">Greška</translation>
    </message>
    <message>
        <source>Welcome</source>
        <translation type="unfinished">Dobrodošli</translation>
    </message>
    <message>
        <source>Welcome to %1.</source>
        <translation type="unfinished">Dobrodošli u %1.</translation>
    </message>
    <message>
        <source>As this is the first time the program is launched, you can choose where %1 will store its data.</source>
        <translation type="unfinished">Kako je ovo prvi put da je ova aplikacija pokrenuta, možete izabrati gdje će %1 spremati svoje podatke.</translation>
    </message>
    <message>
        <source>Limit block chain storage to</source>
        <translation type="unfinished">Ograniči pohranu u blockchain na:</translation>
    </message>
    <message>
        <source>Reverting this setting requires re-downloading the entire blockchain. It is faster to download the full chain first and prune it later. Disables some advanced features.</source>
        <translation type="unfinished">Vraćanje na ovu postavku zahtijeva ponovno preuzimanje cijelog lanca blokova. Brže je najprije preuzeti cijeli lanac pa ga kasnije obrezati. Isključuje napredne mogućnosti.</translation>
    </message>
    <message>
        <source>This initial synchronisation is very demanding, and may expose hardware problems with your computer that had previously gone unnoticed. Each time you run %1, it will continue downloading where it left off.</source>
        <translation type="unfinished">Početna sinkronizacija je vrlo zahtjevna i može otkriti hardverske probleme kod vašeg računala koji su prije prošli nezamijećeno. Svaki put kad pokrenete %1, nastavit će preuzimati odakle je stao.</translation>
    </message>
    <message>
        <source>If you have chosen to limit block chain storage (pruning), the historical data must still be downloaded and processed, but will be deleted afterward to keep your disk usage low.</source>
        <translation type="unfinished">Ako odlučite ograničiti spremanje lanca blokova pomoću pruninga, treba preuzeti i procesirati povijesne podatke. Bit će obrisani naknadno kako bi se smanjila količina zauzetog prostora na disku.</translation>
    </message>
    <message>
        <source>Use the default data directory</source>
        <translation type="unfinished">Koristite uobičajenu podatkovnu mapu</translation>
    </message>
    <message>
        <source>Use a custom data directory:</source>
        <translation type="unfinished">Odaberite različitu podatkovnu mapu:</translation>
    </message>
</context>
<context>
    <name>HelpMessageDialog</name>
    <message>
        <source>version</source>
        <translation type="unfinished">verzija</translation>
    </message>
    <message>
        <source>About %1</source>
        <translation type="unfinished">O programu %1</translation>
    </message>
    <message>
        <source>Command-line options</source>
        <translation type="unfinished">Opcije programa u naredbenoj liniji</translation>
    </message>
</context>
<context>
    <name>ShutdownWindow</name>
    <message>
        <source>%1 is shutting down…</source>
        <translation type="unfinished">%1 do zatvaranja...</translation>
    </message>
    <message>
        <source>Do not shut down the computer until this window disappears.</source>
        <translation type="unfinished">Ne ugasite računalo dok ovaj prozor ne nestane.</translation>
    </message>
</context>
<context>
    <name>ModalOverlay</name>
    <message>
        <source>Form</source>
        <translation type="unfinished">Oblik</translation>
    </message>
    <message>
        <source>Recent transactions may not yet be visible, and therefore your wallet's balance might be incorrect. This information will be correct once your wallet has finished synchronizing with the bitcoin network, as detailed below.</source>
        <translation type="unfinished">Nedavne transakcije možda još nisu vidljive pa vam stanje novčanika može biti netočno. Ove informacije bit će točne nakon što vaš novčanik dovrši sinkronizaciju s Bitcoinovom mrežom, kako je opisano dolje.</translation>
    </message>
    <message>
        <source>Attempting to spend bitcoins that are affected by not-yet-displayed transactions will not be accepted by the network.</source>
        <translation type="unfinished">Mreža neće prihvatiti pokušaje trošenja bitcoina koji su utjecani sa strane transakcija koje još nisu vidljive.</translation>
    </message>
    <message>
        <source>Number of blocks left</source>
        <translation type="unfinished">Broj preostalih blokova</translation>
    </message>
    <message>
        <source>Unknown…</source>
        <translation type="unfinished">Nepoznato...</translation>
    </message>
    <message>
        <source>calculating…</source>
        <translation type="unfinished">računam...</translation>
    </message>
    <message>
        <source>Last block time</source>
        <translation type="unfinished">Posljednje vrijeme bloka</translation>
    </message>
    <message>
        <source>Progress</source>
        <translation type="unfinished">Napredak</translation>
    </message>
    <message>
        <source>Progress increase per hour</source>
        <translation type="unfinished">Postotak povećanja napretka na sat</translation>
    </message>
    <message>
        <source>Estimated time left until synced</source>
        <translation type="unfinished">Preostalo vrijeme do završetka sinkronizacije</translation>
    </message>
    <message>
        <source>Hide</source>
        <translation type="unfinished">Sakrijte</translation>
    </message>
    <message>
        <source>Unknown. Syncing Headers (%1, %2%)…</source>
        <translation type="unfinished">Nepoznato. Sinkroniziranje zaglavlja blokova (%1, %2%)...</translation>
    </message>
    </context>
<context>
    <name>OpenURIDialog</name>
    <message>
        <source>Open bitcoin URI</source>
        <translation type="unfinished">Otvori bitcoin: URI</translation>
    </message>
    <message>
        <source>Paste address from clipboard</source>
        <extracomment>Tooltip text for button that allows you to paste an address that is in your clipboard.</extracomment>
        <translation type="unfinished">Zalijepi adresu iz međuspremnika</translation>
    </message>
</context>
<context>
    <name>OptionsDialog</name>
    <message>
        <source>Options</source>
        <translation type="unfinished">Opcije</translation>
    </message>
    <message>
        <source>&amp;Main</source>
        <translation type="unfinished">&amp;Glavno</translation>
    </message>
    <message>
        <source>Automatically start %1 after logging in to the system.</source>
        <translation type="unfinished">Automatski pokrenite %1 nakon prijave u sustav.</translation>
    </message>
    <message>
        <source>&amp;Start %1 on system login</source>
        <translation type="unfinished">&amp;Pokrenite %1 kod prijave u sustav</translation>
    </message>
    <message>
        <source>Enabling pruning significantly reduces the disk space required to store transactions. All blocks are still fully validated. Reverting this setting requires re-downloading the entire blockchain.</source>
        <translation type="unfinished">Omogućavanje pruninga smanjuje prostor na disku potreban za pohranu transakcija. Svi blokovi su još uvijek potpuno potvrđeni. Poništavanje ove postavke uzrokuje ponovno skidanje cijelog blockchaina.</translation>
    </message>
    <message>
        <source>Size of &amp;database cache</source>
        <translation type="unfinished">Veličina predmemorije baze podataka</translation>
    </message>
    <message>
        <source>Number of script &amp;verification threads</source>
        <translation type="unfinished">Broj CPU niti za verifikaciju transakcija</translation>
    </message>
    <message>
        <source>IP address of the proxy (e.g. IPv4: 127.0.0.1 / IPv6: ::1)</source>
        <translation type="unfinished">IP adresa proxy servera (npr. IPv4: 127.0.0.1 / IPv6: ::1)</translation>
    </message>
    <message>
        <source>Shows if the supplied default SOCKS5 proxy is used to reach peers via this network type.</source>
        <translation type="unfinished">Prikazuje se ako je isporučeni uobičajeni SOCKS5 proxy korišten radi dohvaćanja klijenata preko ovog tipa mreže.</translation>
    </message>
    <message>
        <source>Minimize instead of exit the application when the window is closed. When this option is enabled, the application will be closed only after selecting Exit in the menu.</source>
        <translation type="unfinished">Minimizirati aplikaciju umjesto zatvoriti, kada se zatvori prozor. Kada je ova opcija omogućena, aplikacija će biti zatvorena tek nakon odabira naredbe Izlaz u izborniku.</translation>
    </message>
    <message>
        <source>Open the %1 configuration file from the working directory.</source>
        <translation type="unfinished">Otvorite konfiguracijsku datoteku programa %1 s radne mape.</translation>
    </message>
    <message>
        <source>Open Configuration File</source>
        <translation type="unfinished">Otvorite konfiguracijsku datoteku</translation>
    </message>
    <message>
        <source>Reset all client options to default.</source>
        <translation type="unfinished">Resetiraj sve opcije programa na početne vrijednosti.</translation>
    </message>
    <message>
        <source>&amp;Reset Options</source>
        <translation type="unfinished">&amp;Resetiraj opcije</translation>
    </message>
    <message>
        <source>&amp;Network</source>
        <translation type="unfinished">&amp;Mreža</translation>
    </message>
    <message>
        <source>Prune &amp;block storage to</source>
        <translation type="unfinished">Obrezujte pohranu &amp;blokova na</translation>
    </message>
    <message>
        <source>Reverting this setting requires re-downloading the entire blockchain.</source>
        <translation type="unfinished">Vraćanje na prijašnje stanje zahtijeva ponovo preuzimanje cijelog lanca blokova.</translation>
    </message>
    <message>
        <source>Maximum database cache size. A larger cache can contribute to faster sync, after which the benefit is less pronounced for most use cases. Lowering the cache size will reduce memory usage. Unused mempool memory is shared for this cache.</source>
        <extracomment>Tooltip text for Options window setting that sets the size of the database cache. Explains the corresponding effects of increasing/decreasing this value.</extracomment>
        <translation type="unfinished">Maksimalna veličina cachea baza podataka. Veći cache može doprinijeti bržoj sinkronizaciji, nakon koje je korisnost manje izražena za većinu slučajeva. Smanjenje cache veličine će smanjiti korištenje memorije. Nekorištena mempool memorija se dijeli za ovaj cache. </translation>
    </message>
    <message>
        <source>Set the number of script verification threads. Negative values correspond to the number of cores you want to leave free to the system.</source>
        <extracomment>Tooltip text for Options window setting that sets the number of script verification threads. Explains that negative values mean to leave these many cores free to the system.</extracomment>
        <translation type="unfinished">Postavi broj skript verifikacijskih niti. Negativne vrijednosti odgovaraju broju jezgri koje trebate ostaviti slobodnima za sustav.</translation>
    </message>
    <message>
        <source>(0 = auto, &lt;0 = leave that many cores free)</source>
        <translation type="unfinished">(0 = automatski odredite, &lt;0 = ostavite slobodno upravo toliko jezgri)</translation>
    </message>
    <message>
        <source>This allows you or a third party tool to communicate with the node through command-line and JSON-RPC commands.</source>
        <extracomment>Tooltip text for Options window setting that enables the RPC server.</extracomment>
        <translation type="unfinished">Ovo omogućava vama ili vanjskom alatu komunikaciju s čvorom kroz command-line i JSON-RPC komande.</translation>
    </message>
    <message>
        <source>Enable R&amp;PC server</source>
        <extracomment>An Options window setting to enable the RPC server.</extracomment>
        <translation type="unfinished">Uključi &amp;RPC server</translation>
    </message>
    <message>
        <source>W&amp;allet</source>
        <translation type="unfinished">&amp;Novčanik</translation>
    </message>
    <message>
        <source>Whether to set subtract fee from amount as default or not.</source>
        <extracomment>Tooltip text for Options window setting that sets subtracting the fee from a sending amount as default.</extracomment>
        <translation type="unfinished">Za postavljanje oduzimanja naknade od iznosa kao zadano ili ne.</translation>
    </message>
    <message>
        <source>Subtract &amp;fee from amount by default</source>
        <extracomment>An Options window setting to set subtracting the fee from a sending amount as default.</extracomment>
        <translation type="unfinished">Oduzmi &amp;naknadu od iznosa kao zadano</translation>
    </message>
    <message>
        <source>Expert</source>
        <translation type="unfinished">Stručne postavke</translation>
    </message>
    <message>
        <source>Enable coin &amp;control features</source>
        <translation type="unfinished">Uključite postavke kontroliranja inputa</translation>
    </message>
    <message>
        <source>If you disable the spending of unconfirmed change, the change from a transaction cannot be used until that transaction has at least one confirmation. This also affects how your balance is computed.</source>
        <translation type="unfinished">Ako isključite trošenje nepotvrđenog ostatka, ostatak transakcije ne može biti korišten dok ta transakcija ne dobije barem jednu potvrdu. Također utječe na to kako je vaše stanje računato.</translation>
    </message>
    <message>
        <source>&amp;Spend unconfirmed change</source>
        <translation type="unfinished">&amp;Trošenje nepotvrđenih vraćenih iznosa</translation>
    </message>
    <message>
        <source>Enable &amp;PSBT controls</source>
        <extracomment>An options window setting to enable PSBT controls.</extracomment>
        <translation type="unfinished">Uključi  &amp;PBST opcije za upravljanje</translation>
    </message>
    <message>
        <source>Whether to show PSBT controls.</source>
        <extracomment>Tooltip text for options window setting that enables PSBT controls.</extracomment>
        <translation type="unfinished">Za prikazivanje PSBT opcija za upravaljanje. </translation>
    </message>
    <message>
        <source>External Signer (e.g. hardware wallet)</source>
        <translation type="unfinished">Vanjski potpisnik (npr. hardverski novčanik)</translation>
    </message>
    <message>
        <source>&amp;External signer script path</source>
        <translation type="unfinished">&amp;Put za vanjsku skriptu potpisnika</translation>
    </message>
    <message>
        <source>Automatically open the Bitcoin client port on the router. This only works when your router supports UPnP and it is enabled.</source>
        <translation type="unfinished">Automatski otvori port Bitcoin klijenta na ruteru. To radi samo ako ruter podržava UPnP i ako je omogućen.</translation>
    </message>
    <message>
        <source>Map port using &amp;UPnP</source>
        <translation type="unfinished">Mapiraj port koristeći &amp;UPnP</translation>
    </message>
    <message>
        <source>Automatically open the Bitcoin client port on the router. This only works when your router supports NAT-PMP and it is enabled. The external port could be random.</source>
        <translation type="unfinished">Automatski otvori port Bitcoin klijenta na ruteru. Ovo radi samo ako ruter podržava UPnP i ako je omogućen. Vanjski port može biti nasumičan.</translation>
    </message>
    <message>
        <source>Map port using NA&amp;T-PMP</source>
        <translation type="unfinished">Mapiraj port koristeći &amp;UPnP</translation>
    </message>
    <message>
        <source>Accept connections from outside.</source>
        <translation type="unfinished">Prihvatite veze izvana.</translation>
    </message>
    <message>
        <source>Allow incomin&amp;g connections</source>
        <translation type="unfinished">Dozvolite dolazeće veze</translation>
    </message>
    <message>
        <source>Connect to the Bitcoin network through a SOCKS5 proxy.</source>
        <translation type="unfinished">Spojite se na Bitcoin mrežu kroz SOCKS5 proxy.</translation>
    </message>
    <message>
        <source>&amp;Connect through SOCKS5 proxy (default proxy):</source>
        <translation type="unfinished">&amp;Spojite se kroz SOCKS5 proxy (uobičajeni proxy)</translation>
    </message>
    <message>
        <source>&amp;Port:</source>
        <translation type="unfinished">&amp;Vrata:</translation>
    </message>
    <message>
        <source>Port of the proxy (e.g. 9050)</source>
        <translation type="unfinished">Proxy vrata (npr. 9050)</translation>
    </message>
    <message>
        <source>Used for reaching peers via:</source>
        <translation type="unfinished">Korišten za dohvaćanje klijenata preko:</translation>
    </message>
    <message>
        <source>IPv4</source>
        <translation type="unfinished">IPv4-a</translation>
    </message>
    <message>
        <source>IPv6</source>
        <translation type="unfinished">IPv6-a</translation>
    </message>
    <message>
        <source>Tor</source>
        <translation type="unfinished">Tora</translation>
    </message>
    <message>
        <source>&amp;Window</source>
        <translation type="unfinished">&amp;Prozor</translation>
    </message>
    <message>
        <source>Show the icon in the system tray.</source>
        <translation type="unfinished">Pokaži ikonu sa sustavne trake.</translation>
    </message>
    <message>
        <source>&amp;Show tray icon</source>
        <translation type="unfinished">&amp;Pokaži ikonu</translation>
    </message>
    <message>
        <source>Show only a tray icon after minimizing the window.</source>
        <translation type="unfinished">Prikaži samo ikonu u sistemskoj traci nakon minimiziranja prozora</translation>
    </message>
    <message>
        <source>&amp;Minimize to the tray instead of the taskbar</source>
        <translation type="unfinished">&amp;Minimiziraj u sistemsku traku umjesto u traku programa</translation>
    </message>
    <message>
        <source>M&amp;inimize on close</source>
        <translation type="unfinished">M&amp;inimiziraj kod zatvaranja</translation>
    </message>
    <message>
        <source>&amp;Display</source>
        <translation type="unfinished">&amp;Prikaz</translation>
    </message>
    <message>
        <source>User Interface &amp;language:</source>
        <translation type="unfinished">Jezi&amp;k sučelja:</translation>
    </message>
    <message>
        <source>The user interface language can be set here. This setting will take effect after restarting %1.</source>
        <translation type="unfinished">Jezik korisničkog sučelja može se postaviti ovdje. Postavka će vrijediti nakon ponovnog pokretanja programa %1.</translation>
    </message>
    <message>
        <source>&amp;Unit to show amounts in:</source>
        <translation type="unfinished">&amp;Jedinica za prikaz iznosa:</translation>
    </message>
    <message>
        <source>Choose the default subdivision unit to show in the interface and when sending coins.</source>
        <translation type="unfinished">Izaberite željeni najmanji dio bitcoina koji će biti prikazan u sučelju i koji će se koristiti za plaćanje.</translation>
    </message>
    <message>
        <source>Third-party URLs (e.g. a block explorer) that appear in the transactions tab as context menu items. %s in the URL is replaced by transaction hash. Multiple URLs are separated by vertical bar |.</source>
        <translation type="unfinished">Vanjski URL-ovi transakcije (npr. preglednik blokova) koji se javljaju u kartici transakcija kao elementi kontekstnog izbornika. %s u URL-u zamijenjen je hashom transakcije. Višestruki URL-ovi su odvojeni vertikalnom crtom |.</translation>
    </message>
    <message>
        <source>&amp;Third-party transaction URLs</source>
        <translation type="unfinished">&amp;Vanjski URL-ovi transakcije</translation>
    </message>
    <message>
        <source>Whether to show coin control features or not.</source>
        <translation type="unfinished">Ovisi želite li prikazati mogućnosti kontroliranja inputa ili ne.</translation>
    </message>
    <message>
        <source>Connect to the Bitcoin network through a separate SOCKS5 proxy for Tor onion services.</source>
        <translation type="unfinished">Spojite se na Bitcoin mrežu kroz zaseban SOCKS5 proxy za povezivanje na Tor onion usluge.</translation>
    </message>
    <message>
        <source>Use separate SOCKS&amp;5 proxy to reach peers via Tor onion services:</source>
        <translation type="unfinished">Koristite zaseban SOCKS&amp;5 proxy kako biste dohvatili klijente preko Tora:</translation>
    </message>
    <message>
        <source>Monospaced font in the Overview tab:</source>
        <translation type="unfinished">Font fiksne širine u tabu Pregled:</translation>
    </message>
    <message>
        <source>embedded "%1"</source>
        <translation type="unfinished">ugrađen "%1"</translation>
    </message>
    <message>
        <source>closest matching "%1"</source>
        <translation type="unfinished">najbliže poklapanje "%1"</translation>
    </message>
    <message>
        <source>&amp;OK</source>
        <translation type="unfinished">&amp;U redu</translation>
    </message>
    <message>
        <source>&amp;Cancel</source>
        <translation type="unfinished">&amp;Odustani</translation>
    </message>
    <message>
        <source>Compiled without external signing support (required for external signing)</source>
        <extracomment>"External signing" means using devices such as hardware wallets.</extracomment>
        <translation type="unfinished">Kompajlirano bez mogućnosti vanjskog potpisivanje (potrebno za vanjsko potpisivanje)</translation>
    </message>
    <message>
        <source>default</source>
        <translation type="unfinished">standardne vrijednosti</translation>
    </message>
    <message>
        <source>none</source>
        <translation type="unfinished">ništa</translation>
    </message>
    <message>
        <source>Confirm options reset</source>
        <extracomment>Window title text of pop-up window shown when the user has chosen to reset options.</extracomment>
        <translation type="unfinished">Potvrdite resetiranje opcija</translation>
    </message>
    <message>
        <source>Client restart required to activate changes.</source>
        <extracomment>Text explaining that the settings changed will not come into effect until the client is restarted.</extracomment>
        <translation type="unfinished">Potrebno je ponovno pokretanje klijenta kako bi se promjene aktivirale.</translation>
    </message>
    <message>
        <source>Client will be shut down. Do you want to proceed?</source>
        <extracomment>Text asking the user to confirm if they would like to proceed with a client shutdown.</extracomment>
        <translation type="unfinished">Zatvorit će se klijent. Želite li nastaviti?</translation>
    </message>
    <message>
        <source>Configuration options</source>
        <extracomment>Window title text of pop-up box that allows opening up of configuration file.</extracomment>
        <translation type="unfinished">Konfiguracijske opcije</translation>
    </message>
    <message>
        <source>The configuration file is used to specify advanced user options which override GUI settings. Additionally, any command-line options will override this configuration file.</source>
        <extracomment>Explanatory text about the priority order of instructions considered by client. The order from high to low being: command-line, configuration file, GUI settings.</extracomment>
        <translation type="unfinished">Ova konfiguracijska datoteka je korištena za specificiranje napredne korisničke opcije koje će poništiti postavke GUI-a. Također će bilo koje opcije navedene preko terminala poništiti ovu konfiguracijsku datoteku.</translation>
    </message>
    <message>
        <source>Continue</source>
        <translation type="unfinished">Nastavi</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation type="unfinished">Odustanite</translation>
    </message>
    <message>
        <source>Error</source>
        <translation type="unfinished">Greška</translation>
    </message>
    <message>
        <source>The configuration file could not be opened.</source>
        <translation type="unfinished">Konfiguracijska datoteka nije se mogla otvoriti.</translation>
    </message>
    <message>
        <source>This change would require a client restart.</source>
        <translation type="unfinished">Ova promjena zahtijeva da se klijent ponovo pokrene.</translation>
    </message>
    <message>
        <source>The supplied proxy address is invalid.</source>
        <translation type="unfinished">Priložena proxy adresa je nevažeća.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Form</source>
        <translation type="unfinished">Oblik</translation>
    </message>
    <message>
        <source>The displayed information may be out of date. Your wallet automatically synchronizes with the Bitcoin network after a connection is established, but this process has not completed yet.</source>
        <translation type="unfinished">Prikazani podatci mogu biti zastarjeli. Vaš novčanik se automatski sinkronizira s Bitcoin mrežom kada je veza uspostavljena, ali taj proces još nije završen.</translation>
    </message>
    <message>
        <source>Watch-only:</source>
        <translation type="unfinished">Isključivno promatrane adrese:</translation>
    </message>
    <message>
        <source>Available:</source>
        <translation type="unfinished">Dostupno:</translation>
    </message>
    <message>
        <source>Your current spendable balance</source>
        <translation type="unfinished">Trenutno stanje koje možete trošiti</translation>
    </message>
    <message>
        <source>Pending:</source>
        <translation type="unfinished">Neriješeno:</translation>
    </message>
    <message>
        <source>Total of transactions that have yet to be confirmed, and do not yet count toward the spendable balance</source>
        <translation type="unfinished">Ukupan iznos transakcija koje se još moraju potvrditi te se ne računa kao stanje koje se može trošiti</translation>
    </message>
    <message>
        <source>Immature:</source>
        <translation type="unfinished">Nezrelo:</translation>
    </message>
    <message>
        <source>Mined balance that has not yet matured</source>
        <translation type="unfinished">Izrudareno stanje koje još nije dozrijevalo</translation>
    </message>
    <message>
        <source>Balances</source>
        <translation type="unfinished">Stanja</translation>
    </message>
    <message>
        <source>Total:</source>
        <translation type="unfinished">Ukupno:</translation>
    </message>
    <message>
        <source>Your current total balance</source>
        <translation type="unfinished">Vaše trenutno svekupno stanje</translation>
    </message>
    <message>
        <source>Your current balance in watch-only addresses</source>
        <translation type="unfinished">Vaše trenutno stanje kod eksluzivno promatranih (watch-only) adresa</translation>
    </message>
    <message>
        <source>Spendable:</source>
        <translation type="unfinished">Stanje koje se može trošiti:</translation>
    </message>
    <message>
        <source>Recent transactions</source>
        <translation type="unfinished">Nedavne transakcije</translation>
    </message>
    <message>
        <source>Unconfirmed transactions to watch-only addresses</source>
        <translation type="unfinished">Nepotvrđene transakcije isključivo promatranim adresama</translation>
    </message>
    <message>
        <source>Mined balance in watch-only addresses that has not yet matured</source>
        <translation type="unfinished">Izrudareno stanje na isključivo promatranim adresama koje još nije dozrijevalo</translation>
    </message>
    <message>
        <source>Current total balance in watch-only addresses</source>
        <translation type="unfinished">Trenutno ukupno stanje na isključivo promatranim adresama</translation>
    </message>
    <message>
        <source>Privacy mode activated for the Overview tab. To unmask the values, uncheck Settings-&gt;Mask values.</source>
        <translation type="unfinished">Privatni način aktiviran za tab Pregled. Za prikaz vrijednosti, odznači Postavke -&gt; Sakrij vrijednosti.</translation>
    </message>
</context>
<context>
    <name>PSBTOperationsDialog</name>
    <message>
        <source>Sign Tx</source>
        <translation type="unfinished">Potpiši Tx</translation>
    </message>
    <message>
        <source>Broadcast Tx</source>
        <translation type="unfinished">Objavi Tx</translation>
    </message>
    <message>
        <source>Copy to Clipboard</source>
        <translation type="unfinished">Kopiraj u međuspremnik</translation>
    </message>
    <message>
        <source>Save…</source>
        <translation type="unfinished">Spremi...</translation>
    </message>
    <message>
        <source>Close</source>
        <translation type="unfinished">Zatvori</translation>
    </message>
    <message>
        <source>Failed to load transaction: %1</source>
        <translation type="unfinished">Neuspješno dohvaćanje transakcije: %1</translation>
    </message>
    <message>
        <source>Failed to sign transaction: %1</source>
        <translation type="unfinished">Neuspješno potpisivanje transakcije: %1</translation>
    </message>
    <message>
        <source>Cannot sign inputs while wallet is locked.</source>
        <translation type="unfinished">Nije moguće potpisati inpute dok je novčanik zaključan.</translation>
    </message>
    <message>
        <source>Could not sign any more inputs.</source>
        <translation type="unfinished">Nije bilo moguće potpisati više inputa. </translation>
    </message>
    <message>
        <source>Signed %1 inputs, but more signatures are still required.</source>
        <translation type="unfinished">Potpisano %1 inputa, ali potrebno je još potpisa. </translation>
    </message>
    <message>
        <source>Signed transaction successfully. Transaction is ready to broadcast.</source>
        <translation type="unfinished">Transakcija uspješno potpisana. Transakcija je spremna za objavu.</translation>
    </message>
    <message>
        <source>Unknown error processing transaction.</source>
        <translation type="unfinished">Nepoznata greška pri obradi transakcije.</translation>
    </message>
    <message>
        <source>Transaction broadcast successfully! Transaction ID: %1</source>
        <translation type="unfinished">Uspješna objava transakcije! ID transakcije: %1</translation>
    </message>
    <message>
        <source>Transaction broadcast failed: %1</source>
        <translation type="unfinished">Neuspješna objava transakcije: %1</translation>
    </message>
    <message>
        <source>PSBT copied to clipboard.</source>
        <translation type="unfinished">PBST kopiran u meduspremnik.</translation>
    </message>
    <message>
        <source>Save Transaction Data</source>
        <translation type="unfinished">Spremi podatke transakcije</translation>
    </message>
    <message>
        <source>Partially Signed Transaction (Binary)</source>
        <extracomment>Expanded name of the binary PSBT file format. See: BIP 174.</extracomment>
        <translation type="unfinished">Djelomično potpisana transakcija (binarno)</translation>
    </message>
    <message>
        <source>PSBT saved to disk.</source>
        <translation type="unfinished">PBST spremljen na disk.</translation>
    </message>
    <message>
        <source> * Sends %1 to %2</source>
        <translation type="unfinished">* Šalje %1 %2</translation>
    </message>
    <message>
        <source>Unable to calculate transaction fee or total transaction amount.</source>
        <translation type="unfinished">Ne mogu izračunati naknadu za transakciju niti totalni iznos transakcije.</translation>
    </message>
    <message>
        <source>Pays transaction fee: </source>
        <translation type="unfinished">Plaća naknadu za transakciju:</translation>
    </message>
    <message>
        <source>Total Amount</source>
        <translation type="unfinished">Ukupni iznos</translation>
    </message>
    <message>
        <source>or</source>
        <translation type="unfinished">ili</translation>
    </message>
    <message>
        <source>Transaction has %1 unsigned inputs.</source>
        <translation type="unfinished">Transakcija ima %1 nepotpisanih inputa.</translation>
    </message>
    <message>
        <source>Transaction is missing some information about inputs.</source>
        <translation type="unfinished">Transakciji nedostaje informacija o inputima.</translation>
    </message>
    <message>
        <source>Transaction still needs signature(s).</source>
        <translation type="unfinished">Transakcija još uvijek treba potpis(e).</translation>
    </message>
    <message>
        <source>(But no wallet is loaded.)</source>
        <translation type="unfinished">(Ali nijedan novčanik nije učitan.)</translation>
    </message>
    <message>
        <source>(But this wallet cannot sign transactions.)</source>
        <translation type="unfinished">(Ali ovaj novčanik ne može potpisati transakcije.)</translation>
    </message>
    <message>
        <source>(But this wallet does not have the right keys.)</source>
        <translation type="unfinished">(Ali ovaj novčanik nema odgovarajuće ključeve.)</translation>
    </message>
    <message>
        <source>Transaction is fully signed and ready for broadcast.</source>
        <translation type="unfinished">Transakcija je cjelovito potpisana i spremna za objavu.</translation>
    </message>
    <message>
        <source>Transaction status is unknown.</source>
        <translation type="unfinished">Status transakcije je nepoznat.</translation>
    </message>
</context>
<context>
    <name>PaymentServer</name>
    <message>
        <source>Payment request error</source>
        <translation type="unfinished">Greška kod zahtjeva za plaćanje</translation>
    </message>
    <message>
        <source>Cannot start bitcoin: click-to-pay handler</source>
        <translation type="unfinished">Ne može se pokrenuti klijent: rukovatelj "kliknite da platite"</translation>
    </message>
    <message>
        <source>URI handling</source>
        <translation type="unfinished">URI upravljanje</translation>
    </message>
    <message>
        <source>'bitcoin://' is not a valid URI. Use 'bitcoin:' instead.</source>
        <translation type="unfinished">'bitcoin://' nije ispravan URI. Koristite 'bitcoin:' umjesto toga.</translation>
    </message>
    <message>
        <source>Cannot process payment request because BIP70 is not supported.
Due to widespread security flaws in BIP70 it's strongly recommended that any merchant instructions to switch wallets be ignored.
If you are receiving this error you should request the merchant provide a BIP21 compatible URI.</source>
        <translation type="unfinished">Nemoguće obraditi zahtjev za plaćanje zato što BIP70 nije podržan.
S obzirom na široko rasprostranjene sigurnosne nedostatke u BIP70, preporučljivo je da zanemarite preporuke trgovca u  vezi promjene novčanika.
Ako imate ovu grešku, od trgovca zatražite URI koji je kompatibilan sa BIP21.</translation>
    </message>
    <message>
        <source>URI cannot be parsed! This can be caused by an invalid Bitcoin address or malformed URI parameters.</source>
        <translation type="unfinished">Ne može se parsirati URI! Uzrok tomu može biti nevažeća Bitcoin adresa ili neispravni parametri kod URI-a.</translation>
    </message>
    <message>
        <source>Payment request file handling</source>
        <translation type="unfinished">Rukovanje datotekom zahtjeva za plaćanje</translation>
    </message>
</context>
<context>
    <name>PeerTableModel</name>
    <message>
        <source>User Agent</source>
        <extracomment>Title of Peers Table column which contains the peer's User Agent string.</extracomment>
        <translation type="unfinished">Korisnički agent</translation>
    </message>
    <message>
        <source>Direction</source>
        <extracomment>Title of Peers Table column which indicates the direction the peer connection was initiated from.</extracomment>
        <translation type="unfinished">Smjer</translation>
    </message>
    <message>
        <source>Sent</source>
        <extracomment>Title of Peers Table column which indicates the total amount of network information we have sent to the peer.</extracomment>
        <translation type="unfinished">Poslano</translation>
    </message>
    <message>
        <source>Received</source>
        <extracomment>Title of Peers Table column which indicates the total amount of network information we have received from the peer.</extracomment>
        <translation type="unfinished">Primljeno</translation>
    </message>
    <message>
        <source>Address</source>
        <extracomment>Title of Peers Table column which contains the IP/Onion/I2P address of the connected peer.</extracomment>
        <translation type="unfinished">Adresa</translation>
    </message>
    <message>
        <source>Type</source>
        <extracomment>Title of Peers Table column which describes the type of peer connection. The "type" describes why the connection exists.</extracomment>
        <translation type="unfinished">Tip</translation>
    </message>
    <message>
        <source>Network</source>
        <extracomment>Title of Peers Table column which states the network the peer connected through.</extracomment>
        <translation type="unfinished">Mreža</translation>
    </message>
    <message>
        <source>Inbound</source>
        <extracomment>An Inbound Connection from a Peer.</extracomment>
        <translation type="unfinished">Dolazni</translation>
    </message>
    <message>
        <source>Outbound</source>
        <extracomment>An Outbound Connection to a Peer.</extracomment>
        <translation type="unfinished">Izlazni</translation>
    </message>
</context>
<context>
    <name>QRImageWidget</name>
    <message>
        <source>&amp;Save Image…</source>
        <translation type="unfinished">&amp;Spremi sliku...</translation>
    </message>
    <message>
        <source>&amp;Copy Image</source>
        <translation type="unfinished">&amp;Kopirajte sliku</translation>
    </message>
    <message>
        <source>Resulting URI too long, try to reduce the text for label / message.</source>
        <translation type="unfinished">URI je predug, probajte skratiti tekst za naslov / poruku.</translation>
    </message>
    <message>
        <source>Error encoding URI into QR Code.</source>
        <translation type="unfinished">Greška kod kodiranja URI adrese u QR kod.</translation>
    </message>
    <message>
        <source>QR code support not available.</source>
        <translation type="unfinished">Podrška za QR kodove je nedostupna.</translation>
    </message>
    <message>
        <source>Save QR Code</source>
        <translation type="unfinished">Spremi QR kod</translation>
    </message>
    <message>
        <source>PNG Image</source>
        <extracomment>Expanded name of the PNG file format. See: https://en.wikipedia.org/wiki/Portable_Network_Graphics.</extracomment>
        <translation type="unfinished">PNG slika</translation>
    </message>
</context>
<context>
    <name>RPCConsole</name>
    <message>
        <source>Client version</source>
        <translation type="unfinished">Verzija klijenta</translation>
    </message>
    <message>
        <source>&amp;Information</source>
        <translation type="unfinished">&amp;Informacije</translation>
    </message>
    <message>
        <source>General</source>
        <translation type="unfinished">Općenito</translation>
    </message>
    <message>
        <source>Datadir</source>
        <translation type="unfinished">Datadir (podatkovna mapa)</translation>
    </message>
    <message>
        <source>To specify a non-default location of the data directory use the '%1' option.</source>
        <translation type="unfinished">Koristite opciju '%1' ako želite zadati drugu lokaciju podatkovnoj mapi.</translation>
    </message>
    <message>
        <source>To specify a non-default location of the blocks directory use the '%1' option.</source>
        <translation type="unfinished">Koristite opciju '%1' ako želite zadati drugu lokaciju mapi u kojoj se nalaze blokovi.</translation>
    </message>
    <message>
        <source>Startup time</source>
        <translation type="unfinished">Vrijeme pokretanja</translation>
    </message>
    <message>
        <source>Network</source>
        <translation type="unfinished">Mreža</translation>
    </message>
    <message>
        <source>Name</source>
        <translation type="unfinished">Ime</translation>
    </message>
    <message>
        <source>Number of connections</source>
        <translation type="unfinished">Broj veza</translation>
    </message>
    <message>
        <source>Block chain</source>
        <translation type="unfinished">Lanac blokova</translation>
    </message>
    <message>
        <source>Memory Pool</source>
        <translation type="unfinished">Memorijski bazen</translation>
    </message>
    <message>
        <source>Current number of transactions</source>
        <translation type="unfinished">Trenutan broj transakcija</translation>
    </message>
    <message>
        <source>Memory usage</source>
        <translation type="unfinished">Korištena memorija</translation>
    </message>
    <message>
        <source>Wallet: </source>
        <translation type="unfinished">Novčanik:</translation>
    </message>
    <message>
        <source>(none)</source>
        <translation type="unfinished">(ništa)</translation>
    </message>
    <message>
        <source>&amp;Reset</source>
        <translation type="unfinished">&amp;Resetirajte</translation>
    </message>
    <message>
        <source>Received</source>
        <translation type="unfinished">Primljeno</translation>
    </message>
    <message>
        <source>Sent</source>
        <translation type="unfinished">Poslano</translation>
    </message>
    <message>
        <source>&amp;Peers</source>
        <translation type="unfinished">&amp;Klijenti</translation>
    </message>
    <message>
        <source>Banned peers</source>
        <translation type="unfinished">Zabranjeni klijenti</translation>
    </message>
    <message>
        <source>Select a peer to view detailed information.</source>
        <translation type="unfinished">Odaberite klijent kako biste vidjeli detaljne informacije.</translation>
    </message>
    <message>
        <source>Version</source>
        <translation type="unfinished">Verzija</translation>
    </message>
    <message>
        <source>Starting Block</source>
        <translation type="unfinished">Početni blok</translation>
    </message>
    <message>
        <source>Synced Headers</source>
        <translation type="unfinished">Broj sinkroniziranih zaglavlja</translation>
    </message>
    <message>
        <source>Synced Blocks</source>
        <translation type="unfinished">Broj sinkronizranih blokova</translation>
    </message>
    <message>
        <source>Last Transaction</source>
        <translation type="unfinished">Zadnja transakcija</translation>
    </message>
    <message>
        <source>The mapped Autonomous System used for diversifying peer selection.</source>
        <translation type="unfinished">Mapirani Autonomni sustav koji se koristi za diverzifikaciju odabira peer-ova.</translation>
    </message>
    <message>
        <source>Mapped AS</source>
        <translation type="unfinished">Mapirano kao</translation>
    </message>
    <message>
        <source>Whether we relay addresses to this peer.</source>
        <extracomment>Tooltip text for the Address Relay field in the peer details area, which displays whether we relay addresses to this peer (Yes/No).</extracomment>
        <translation type="unfinished">Prenosimo li adrese ovom peer-u.</translation>
    </message>
    <message>
        <source>Address Relay</source>
        <extracomment>Text title for the Address Relay field in the peer details area, which displays whether we relay addresses to this peer (Yes/No).</extracomment>
        <translation type="unfinished">Prijenos adresa</translation>
    </message>
    <message>
        <source>Addresses Processed</source>
        <extracomment>Text title for the Addresses Processed field in the peer details area, which displays the total number of addresses received from this peer that were processed (excludes addresses that were dropped due to rate-limiting).</extracomment>
        <translation type="unfinished">Obrađene adrese</translation>
    </message>
    <message>
        <source>Addresses Rate-Limited</source>
        <extracomment>Text title for the Addresses Rate-Limited field in the peer details area, which displays the total number of addresses received from this peer that were dropped (not processed) due to rate-limiting.</extracomment>
        <translation type="unfinished">Adrese ograničene brzinom</translation>
    </message>
    <message>
        <source>User Agent</source>
        <translation type="unfinished">Korisnički agent</translation>
    </message>
    <message>
        <source>Node window</source>
        <translation type="unfinished">Konzola za čvor</translation>
    </message>
    <message>
        <source>Current block height</source>
        <translation type="unfinished">Trenutna visina bloka</translation>
    </message>
    <message>
        <source>Open the %1 debug log file from the current data directory. This can take a few seconds for large log files.</source>
        <translation type="unfinished">Otvorite datoteku zapisa programa %1 iz trenutne podatkovne mape. Može potrajati nekoliko sekundi za velike datoteke zapisa.</translation>
    </message>
    <message>
        <source>Decrease font size</source>
        <translation type="unfinished">Smanjite veličinu fonta</translation>
    </message>
    <message>
        <source>Increase font size</source>
        <translation type="unfinished">Povećajte veličinu fonta</translation>
    </message>
    <message>
        <source>Permissions</source>
        <translation type="unfinished">Dopuštenja</translation>
    </message>
    <message>
        <source>The direction and type of peer connection: %1</source>
        <translation type="unfinished">Smjer i tip peer konekcije: %1</translation>
    </message>
    <message>
        <source>Direction/Type</source>
        <translation type="unfinished">Smjer/tip</translation>
    </message>
    <message>
        <source>The network protocol this peer is connected through: IPv4, IPv6, Onion, I2P, or CJDNS.</source>
        <translation type="unfinished">Mrežni protokoli kroz koje je spojen ovaj peer: IPv4, IPv6, Onion, I2P, ili CJDNS.</translation>
    </message>
    <message>
        <source>Services</source>
        <translation type="unfinished">Usluge</translation>
    </message>
    <message>
        <source>High bandwidth BIP152 compact block relay: %1</source>
        <translation type="unfinished">Visoka razina BIP152 kompaktnog blok prijenosa: %1</translation>
    </message>
    <message>
        <source>High Bandwidth</source>
        <translation type="unfinished">Visoka razina prijenosa podataka</translation>
    </message>
    <message>
        <source>Connection Time</source>
        <translation type="unfinished">Trajanje veze</translation>
    </message>
    <message>
        <source>Elapsed time since a novel block passing initial validity checks was received from this peer.</source>
        <translation type="unfinished">Vrijeme prošlo od kada je ovaj peer primio novi bloka koji je prošao osnovne provjere validnosti.</translation>
    </message>
    <message>
        <source>Last Block</source>
        <translation type="unfinished">Zadnji blok</translation>
    </message>
    <message>
        <source>Elapsed time since a novel transaction accepted into our mempool was received from this peer.</source>
        <extracomment>Tooltip text for the Last Transaction field in the peer details area.</extracomment>
        <translation type="unfinished">Vrijeme prošlo od kada je ovaj peer primio novu transakciju koja je prihvaćena u naš mempool.</translation>
    </message>
    <message>
        <source>Last Send</source>
        <translation type="unfinished">Zadnja pošiljka</translation>
    </message>
    <message>
        <source>Last Receive</source>
        <translation type="unfinished">Zadnji primitak</translation>
    </message>
    <message>
        <source>Ping Time</source>
        <translation type="unfinished">Vrijeme pinga</translation>
    </message>
    <message>
        <source>The duration of a currently outstanding ping.</source>
        <translation type="unfinished">Trajanje trenutno izvanrednog pinga</translation>
    </message>
    <message>
        <source>Ping Wait</source>
        <translation type="unfinished">Zakašnjenje pinga</translation>
    </message>
    <message>
        <source>Min Ping</source>
        <translation type="unfinished">Min ping</translation>
    </message>
    <message>
        <source>Time Offset</source>
        <translation type="unfinished">Vremenski ofset</translation>
    </message>
    <message>
        <source>Last block time</source>
        <translation type="unfinished">Posljednje vrijeme bloka</translation>
    </message>
    <message>
        <source>&amp;Open</source>
        <translation type="unfinished">&amp;Otvori</translation>
    </message>
    <message>
        <source>&amp;Console</source>
        <translation type="unfinished">&amp;Konzola</translation>
    </message>
    <message>
        <source>&amp;Network Traffic</source>
        <translation type="unfinished">&amp;Mrežni promet</translation>
    </message>
    <message>
        <source>Totals</source>
        <translation type="unfinished">Ukupno:</translation>
    </message>
    <message>
        <source>Debug log file</source>
        <translation type="unfinished">Datoteka ispisa za debagiranje</translation>
    </message>
    <message>
        <source>Clear console</source>
        <translation type="unfinished">Očisti konzolu</translation>
    </message>
    <message>
        <source>In:</source>
        <translation type="unfinished">Dolazne:</translation>
    </message>
    <message>
        <source>Out:</source>
        <translation type="unfinished">Izlazne:</translation>
    </message>
    <message>
        <source>Inbound: initiated by peer</source>
        <extracomment>Explanatory text for an inbound peer connection.</extracomment>
        <translation type="unfinished">Ulazna: pokrenuo peer</translation>
    </message>
    <message>
        <source>Outbound Full Relay: default</source>
        <extracomment>Explanatory text for an outbound peer connection that relays all network information. This is the default behavior for outbound connections.</extracomment>
        <translation type="unfinished">Izlazni potpuni prijenos: zadano</translation>
    </message>
    <message>
        <source>Outbound Block Relay: does not relay transactions or addresses</source>
        <extracomment>Explanatory text for an outbound peer connection that relays network information about blocks and not transactions or addresses.</extracomment>
        <translation type="unfinished">Izlazni blok prijenos: ne prenosi transakcije ili adrese</translation>
    </message>
    <message>
        <source>Outbound Manual: added using RPC %1 or %2/%3 configuration options</source>
        <extracomment>Explanatory text for an outbound peer connection that was established manually through one of several methods. The numbered arguments are stand-ins for the methods available to establish manual connections.</extracomment>
        <translation type="unfinished">Priručnik za izlazeće (?): dodano koristeći RPC %1 ili %2/%3 konfiguracijske opcije</translation>
    </message>
    <message>
        <source>Outbound Feeler: short-lived, for testing addresses</source>
        <extracomment>Explanatory text for a short-lived outbound peer connection that is used to test the aliveness of known addresses.</extracomment>
        <translation type="unfinished">Izlazni ispipavač: kratkotrajan, za testiranje adresa</translation>
    </message>
    <message>
        <source>Outbound Address Fetch: short-lived, for soliciting addresses</source>
        <extracomment>Explanatory text for a short-lived outbound peer connection that is used to request addresses from a peer.</extracomment>
        <translation type="unfinished">Dohvaćanje izlaznih adresa: kratkotrajno, za traženje adresa</translation>
    </message>
    <message>
        <source>we selected the peer for high bandwidth relay</source>
        <translation type="unfinished">odabrali smo peera za brzopodatkovni prijenos</translation>
    </message>
    <message>
        <source>the peer selected us for high bandwidth relay</source>
        <translation type="unfinished">peer odabran za brzopodatkovni prijenos</translation>
    </message>
    <message>
        <source>no high bandwidth relay selected</source>
        <translation type="unfinished">brzopodatkovni prijenos nije odabran</translation>
    </message>
    <message>
        <source>&amp;Copy address</source>
        <extracomment>Context menu action to copy the address of a peer.</extracomment>
        <translation type="unfinished">&amp;Kopiraj adresu</translation>
    </message>
    <message>
        <source>&amp;Disconnect</source>
        <translation type="unfinished">&amp;Odspojite</translation>
    </message>
    <message>
        <source>1 &amp;hour</source>
        <translation type="unfinished">1 &amp;sat</translation>
    </message>
    <message>
        <source>1 d&amp;ay</source>
        <translation type="unfinished">1 d&amp;an</translation>
    </message>
    <message>
        <source>1 &amp;week</source>
        <translation type="unfinished">1 &amp;tjedan</translation>
    </message>
    <message>
        <source>1 &amp;year</source>
        <translation type="unfinished">1 &amp;godinu</translation>
    </message>
    <message>
        <source>&amp;Copy IP/Netmask</source>
        <extracomment>Context menu action to copy the IP/Netmask of a banned peer. IP/Netmask is the combination of a peer's IP address and its Netmask. For IP address, see: https://en.wikipedia.org/wiki/IP_address.</extracomment>
        <translation type="unfinished">&amp;Kopiraj IP/Netmask</translation>
    </message>
    <message>
        <source>&amp;Unban</source>
        <translation type="unfinished">&amp;Ukinite zabranu</translation>
    </message>
    <message>
        <source>Network activity disabled</source>
        <translation type="unfinished">Mrežna aktivnost isključena</translation>
    </message>
    <message>
        <source>Executing command without any wallet</source>
        <translation type="unfinished">Izvršava se naredba bez bilo kakvog novčanika</translation>
    </message>
    <message>
        <source>Executing command using "%1" wallet</source>
        <translation type="unfinished">Izvršava se naredba koristeći novčanik "%1"</translation>
    </message>
    <message>
        <source>Welcome to the %1 RPC console.
Use up and down arrows to navigate history, and %2 to clear screen.
Use %3 and %4 to increase or decrease the font size.
Type %5 for an overview of available commands.
For more information on using this console, type %6.

%7WARNING: Scammers have been active, telling users to type commands here, stealing their wallet contents. Do not use this console without fully understanding the ramifications of a command.%8</source>
        <extracomment>RPC console welcome message. Placeholders %7 and %8 are style tags for the warning content, and they are not space separated from the rest of the text intentionally.</extracomment>
        <translation type="unfinished">Dobrodošli u %1 RPC konzolu.
Koristite strelice za gore i dolje kako biste navigirali kroz povijest, i %2 za micanje svega sa zaslona.
Koristite %3 i %4 za smanjivanje i povećavanje veličine fonta.
Utipkajte %5 za pregled svih dosrupnih komandi.
Za više informacija o korištenju ove konzile, utipkajte %6.

%7UPOZORENJE: Prevaranti su uvijek aktivni te kradu sadržaj novčanika korisnika tako što im daju upute koje komande upisati. Nemojte koristiti ovu konzolu bez potpunog razumijevanja posljedica upisivanja komande.%8</translation>
    </message>
    <message>
        <source>Executing…</source>
        <extracomment>A console message indicating an entered command is currently being executed.</extracomment>
        <translation type="unfinished">Izvršavam...</translation>
    </message>
    <message>
        <source>via %1</source>
        <translation type="unfinished">preko %1</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation type="unfinished">Da</translation>
    </message>
    <message>
        <source>No</source>
        <translation type="unfinished">Ne</translation>
    </message>
    <message>
        <source>To</source>
        <translation type="unfinished">Za</translation>
    </message>
    <message>
        <source>From</source>
        <translation type="unfinished">Od</translation>
    </message>
    <message>
        <source>Ban for</source>
        <translation type="unfinished">Zabranite za</translation>
    </message>
    <message>
        <source>Never</source>
        <translation type="unfinished">Nikada</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation type="unfinished">Nepoznato</translation>
    </message>
</context>
<context>
    <name>ReceiveCoinsDialog</name>
    <message>
        <source>&amp;Amount:</source>
        <translation type="unfinished">&amp;Iznos:</translation>
    </message>
    <message>
        <source>&amp;Label:</source>
        <translation type="unfinished">&amp;Oznaka:</translation>
    </message>
    <message>
        <source>&amp;Message:</source>
        <translation type="unfinished">&amp;Poruka:</translation>
    </message>
    <message>
        <source>An optional message to attach to the payment request, which will be displayed when the request is opened. Note: The message will not be sent with the payment over the Bitcoin network.</source>
        <translation type="unfinished">Opcionalna poruka koja se može dodati kao privitak zahtjevu za plaćanje. Bit će prikazana kad je zahtjev otvoren. Napomena: Ova poruka neće biti poslana zajedno s uplatom preko Bitcoin mreže.</translation>
    </message>
    <message>
        <source>An optional label to associate with the new receiving address.</source>
        <translation type="unfinished">Opcionalna oznaka koja će se povezati s novom primateljskom adresom.</translation>
    </message>
    <message>
        <source>Use this form to request payments. All fields are &lt;b&gt;optional&lt;/b&gt;.</source>
        <translation type="unfinished">Koristite ovaj formular kako biste zahtijevali uplate. Sva su polja &lt;b&gt;opcionalna&lt;/b&gt;.</translation>
    </message>
    <message>
        <source>An optional amount to request. Leave this empty or zero to not request a specific amount.</source>
        <translation type="unfinished">Opcionalan iznos koji možete zahtijevati. Ostavite ovo prazno ili unesite nulu ako ne želite zahtijevati specifičan iznos.</translation>
    </message>
    <message>
        <source>An optional label to associate with the new receiving address (used by you to identify an invoice).  It is also attached to the payment request.</source>
        <translation type="unfinished">Neobvezna oznaka za označavanje nove primateljske adrese (koristi se za identifikaciju računa). Također je pridružena zahtjevu za plaćanje.</translation>
    </message>
    <message>
        <source>An optional message that is attached to the payment request and may be displayed to the sender.</source>
        <translation type="unfinished">Izborna poruka je priložena zahtjevu za plaćanje i može se prikazati pošiljatelju.</translation>
    </message>
    <message>
        <source>&amp;Create new receiving address</source>
        <translation type="unfinished">&amp;Stvorite novu primateljsku adresu</translation>
    </message>
    <message>
        <source>Clear all fields of the form.</source>
        <translation type="unfinished">Obriši sva polja</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation type="unfinished">Obrišite</translation>
    </message>
    <message>
        <source>Requested payments history</source>
        <translation type="unfinished">Povijest zahtjeva za plaćanje</translation>
    </message>
    <message>
        <source>Show the selected request (does the same as double clicking an entry)</source>
        <translation type="unfinished">Prikazuje izabran zahtjev (isto učini dvostruki klik na zapis)</translation>
    </message>
    <message>
        <source>Show</source>
        <translation type="unfinished">Pokaži</translation>
    </message>
    <message>
        <source>Remove the selected entries from the list</source>
        <translation type="unfinished">Uklonite odabrane zapise s popisa</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation type="unfinished">Uklonite</translation>
    </message>
    <message>
        <source>Copy &amp;URI</source>
        <translation type="unfinished">Kopiraj &amp;URI</translation>
    </message>
    <message>
        <source>&amp;Copy address</source>
        <translation type="unfinished">&amp;Kopiraj adresu</translation>
    </message>
    <message>
        <source>Copy &amp;label</source>
        <translation type="unfinished">Kopiraj &amp;oznaku</translation>
    </message>
    <message>
        <source>Copy &amp;message</source>
        <translation type="unfinished">Kopiraj &amp;poruku</translation>
    </message>
    <message>
        <source>Copy &amp;amount</source>
        <translation type="unfinished">Kopiraj &amp;iznos</translation>
    </message>
    <message>
        <source>Could not unlock wallet.</source>
        <translation type="unfinished">Ne može se otključati novčanik.</translation>
    </message>
    <message>
        <source>Could not generate new %1 address</source>
        <translation type="unfinished">Ne mogu generirati novu %1 adresu</translation>
    </message>
</context>
<context>
    <name>ReceiveRequestDialog</name>
    <message>
        <source>Request payment to …</source>
        <translation type="unfinished">Zatraži plaćanje na...</translation>
    </message>
    <message>
        <source>Address:</source>
        <translation type="unfinished">Adresa:</translation>
    </message>
    <message>
        <source>Amount:</source>
        <translation type="unfinished">Iznos:</translation>
    </message>
    <message>
        <source>Label:</source>
        <translation type="unfinished">Oznaka</translation>
    </message>
    <message>
        <source>Message:</source>
        <translation type="unfinished">Poruka:</translation>
    </message>
    <message>
        <source>Wallet:</source>
        <translation type="unfinished">Novčanik:</translation>
    </message>
    <message>
        <source>Copy &amp;URI</source>
        <translation type="unfinished">Kopiraj &amp;URI</translation>
    </message>
    <message>
        <source>Copy &amp;Address</source>
        <translation type="unfinished">Kopiraj &amp;adresu</translation>
    </message>
    <message>
        <source>&amp;Verify</source>
        <translation type="unfinished">&amp;Verificiraj</translation>
    </message>
    <message>
        <source>Verify this address on e.g. a hardware wallet screen</source>
        <translation type="unfinished">Verificiraj ovu adresu na npr. zaslonu hardverskog novčanika</translation>
    </message>
    <message>
        <source>&amp;Save Image…</source>
        <translation type="unfinished">&amp;Spremi sliku...</translation>
    </message>
    <message>
        <source>Payment information</source>
        <translation type="unfinished">Informacije o uplati</translation>
    </message>
    <message>
        <source>Request payment to %1</source>
        <translation type="unfinished">&amp;Zatražite plaćanje na adresu %1</translation>
    </message>
</context>
<context>
    <name>RecentRequestsTableModel</name>
    <message>
        <source>Date</source>
        <translation type="unfinished">Datum</translation>
    </message>
    <message>
        <source>Label</source>
        <translation type="unfinished">Oznaka</translation>
    </message>
    <message>
        <source>Message</source>
        <translation type="unfinished">Poruka</translation>
    </message>
    <message>
        <source>(no label)</source>
        <translation type="unfinished">(nema oznake)</translation>
    </message>
    <message>
        <source>(no message)</source>
        <translation type="unfinished">(bez poruke)</translation>
    </message>
    <message>
        <source>(no amount requested)</source>
        <translation type="unfinished">(nikakav iznos zahtijevan)</translation>
    </message>
    <message>
        <source>Requested</source>
        <translation type="unfinished">Zatraženo</translation>
    </message>
</context>
<context>
    <name>SendCoinsDialog</name>
    <message>
        <source>Send Coins</source>
        <translation type="unfinished">Slanje novca</translation>
    </message>
    <message>
        <source>Coin Control Features</source>
        <translation type="unfinished">Mogućnosti kontroliranja inputa</translation>
    </message>
    <message>
        <source>automatically selected</source>
        <translation type="unfinished">automatski izabrano</translation>
    </message>
    <message>
        <source>Insufficient funds!</source>
        <translation type="unfinished">Nedovoljna sredstva</translation>
    </message>
    <message>
        <source>Quantity:</source>
        <translation type="unfinished">Količina:</translation>
    </message>
    <message>
        <source>Bytes:</source>
        <translation type="unfinished">Bajtova:</translation>
    </message>
    <message>
        <source>Amount:</source>
        <translation type="unfinished">Iznos:</translation>
    </message>
    <message>
        <source>Fee:</source>
        <translation type="unfinished">Naknada:</translation>
    </message>
    <message>
        <source>After Fee:</source>
        <translation type="unfinished">Nakon naknade:</translation>
    </message>
    <message>
        <source>Change:</source>
        <translation type="unfinished">Vraćeno:</translation>
    </message>
    <message>
        <source>If this is activated, but the change address is empty or invalid, change will be sent to a newly generated address.</source>
        <translation type="unfinished">Ako je ovo aktivirano, ali adresa u koju treba poslati ostatak je prazna ili nevažeća, onda će ostatak biti poslan u novo generiranu adresu.</translation>
    </message>
    <message>
        <source>Custom change address</source>
        <translation type="unfinished">Zadana adresa u koju će ostatak biti poslan</translation>
    </message>
    <message>
        <source>Transaction Fee:</source>
        <translation type="unfinished">Naknada za transakciju:</translation>
    </message>
    <message>
        <source>Using the fallbackfee can result in sending a transaction that will take several hours or days (or never) to confirm. Consider choosing your fee manually or wait until you have validated the complete chain.</source>
        <translation type="unfinished">Korištenje rezervnu naknadu može rezultirati slanjem transakcije kojoj može trebati nekoliko sati ili dana (ili pak nikad) da se potvrdi. Uzmite u obzir ručno biranje naknade ili pričekajte da se cijeli lanac validira.</translation>
    </message>
    <message>
        <source>Warning: Fee estimation is currently not possible.</source>
        <translation type="unfinished">Upozorenje: Procjena naknada trenutno nije moguća.</translation>
    </message>
    <message>
        <source>per kilobyte</source>
        <translation type="unfinished">po kilobajtu</translation>
    </message>
    <message>
        <source>Hide</source>
        <translation type="unfinished">Sakrijte</translation>
    </message>
    <message>
        <source>Recommended:</source>
        <translation type="unfinished">Preporučeno:</translation>
    </message>
    <message>
        <source>Custom:</source>
        <translation type="unfinished">Zadano:</translation>
    </message>
    <message>
        <source>Send to multiple recipients at once</source>
        <translation type="unfinished">Pošalji novce većem broju primatelja u jednoj transakciji</translation>
    </message>
    <message>
        <source>Add &amp;Recipient</source>
        <translation type="unfinished">&amp;Dodaj primatelja</translation>
    </message>
    <message>
        <source>Clear all fields of the form.</source>
        <translation type="unfinished">Obriši sva polja</translation>
    </message>
    <message>
        <source>Inputs…</source>
        <translation type="unfinished">Inputi...</translation>
    </message>
    <message>
        <source>Dust:</source>
        <translation type="unfinished">Prah:</translation>
    </message>
    <message>
        <source>Choose…</source>
        <translation type="unfinished">Odaberi...</translation>
    </message>
    <message>
        <source>Hide transaction fee settings</source>
        <translation type="unfinished">Sakrijte postavke za transakcijske provizije
</translation>
    </message>
    <message>
        <source>Specify a custom fee per kB (1,000 bytes) of the transaction's virtual size.

Note:  Since the fee is calculated on a per-byte basis, a fee rate of "100 satoshis per kvB" for a transaction size of 500 virtual bytes (half of 1 kvB) would ultimately yield a fee of only 50 satoshis.</source>
        <translation type="unfinished">Zadajte prilagodenu naknadu po kB (1000 bajtova) virtualne veličine transakcije.

Napomena: Budući da se naknada računa po bajtu, naknada od "100 satošija po kB" za transakciju veličine 500 bajtova (polovica od 1 kB) rezultirala bi ultimativno naknadom od samo 50 satošija.</translation>
    </message>
    <message>
        <source>When there is less transaction volume than space in the blocks, miners as well as relaying nodes may enforce a minimum fee. Paying only this minimum fee is just fine, but be aware that this can result in a never confirming transaction once there is more demand for bitcoin transactions than the network can process.</source>
        <translation type="unfinished">Kada je kapacitet transakcija manja od prostora u blokovima, rudari i čvorovi prenositelji mogu zatražiti minimalnu naknadu. Prihvatljivo je platiti samo ovu minimalnu naknadu, ali budite svjesni da ovime može nastati transakcija koja se nikad ne potvrđuje čim je potražnja za korištenjem Bitcoina veća nego što mreža može obraditi.</translation>
    </message>
    <message>
        <source>A too low fee might result in a never confirming transaction (read the tooltip)</source>
        <translation type="unfinished">Preniska naknada može rezultirati transakcijom koja se nikad ne potvrđuje (vidite oblačić)</translation>
    </message>
    <message>
        <source>(Smart fee not initialized yet. This usually takes a few blocks…)</source>
        <translation type="unfinished">(Pametna procjena naknada još nije inicijalizirana. Inače traje nekoliko blokova...)</translation>
    </message>
    <message>
        <source>Confirmation time target:</source>
        <translation type="unfinished">Ciljno vrijeme potvrde:</translation>
    </message>
    <message>
        <source>Enable Replace-By-Fee</source>
        <translation type="unfinished">Uključite Replace-By-Fee</translation>
    </message>
    <message>
        <source>With Replace-By-Fee (BIP-125) you can increase a transaction's fee after it is sent. Without this, a higher fee may be recommended to compensate for increased transaction delay risk.</source>
        <translation type="unfinished">Pomoću mogućnosti Replace-By-Fee (BIP-125) možete povećati naknadu transakcije nakon što je poslana. Bez ovoga može biti preporučena veća naknada kako bi nadoknadila povećani rizik zakašnjenja transakcije.</translation>
    </message>
    <message>
        <source>Clear &amp;All</source>
        <translation type="unfinished">Obriši &amp;sve</translation>
    </message>
    <message>
        <source>Balance:</source>
        <translation type="unfinished">Stanje:</translation>
    </message>
    <message>
        <source>Confirm the send action</source>
        <translation type="unfinished">Potvrdi akciju slanja</translation>
    </message>
    <message>
        <source>S&amp;end</source>
        <translation type="unfinished">&amp;Pošalji</translation>
    </message>
    <message>
        <source>Copy quantity</source>
        <translation type="unfinished">Kopirajte iznos</translation>
    </message>
    <message>
        <source>Copy amount</source>
        <translation type="unfinished">Kopirajte iznos</translation>
    </message>
    <message>
        <source>Copy fee</source>
        <translation type="unfinished">Kopirajte naknadu</translation>
    </message>
    <message>
        <source>Copy after fee</source>
        <translation type="unfinished">Kopirajte iznos nakon naknade</translation>
    </message>
    <message>
        <source>Copy bytes</source>
        <translation type="unfinished">Kopirajte količinu bajtova</translation>
    </message>
    <message>
        <source>Copy dust</source>
        <translation type="unfinished">Kopirajte sićušne iznose ("prašinu")</translation>
    </message>
    <message>
        <source>Copy change</source>
        <translation type="unfinished">Kopirajte ostatak</translation>
    </message>
    <message>
        <source>%1 (%2 blocks)</source>
        <translation type="unfinished">%1 (%2 blokova)</translation>
    </message>
    <message>
        <source>Sign on device</source>
        <extracomment>"device" usually means a hardware wallet.</extracomment>
        <translation type="unfinished">Potpiši na uređaju</translation>
    </message>
    <message>
        <source>Connect your hardware wallet first.</source>
        <translation type="unfinished">Prvo poveži svoj hardverski novčanik.</translation>
    </message>
    <message>
        <source>Set external signer script path in Options -&gt; Wallet</source>
        <extracomment>"External signer" means using devices such as hardware wallets.</extracomment>
        <translation type="unfinished">Postavi put za vanjsku skriptu potpisnika u Opcije -&gt; Novčanik</translation>
    </message>
    <message>
        <source>Cr&amp;eate Unsigned</source>
        <translation type="unfinished">Cr&amp;eate nije potpisan</translation>
    </message>
    <message>
        <source>Creates a Partially Signed Bitcoin Transaction (PSBT) for use with e.g. an offline %1 wallet, or a PSBT-compatible hardware wallet.</source>
        <translation type="unfinished">Stvara djelomično potpisanu Bitcoin transakciju (Partially Signed Bitcoin Transaction - PSBT) za upotrebu sa npr. novčanikom %1 koji nije povezan s mrežom ili sa PSBT kompatibilnim hardverskim novčanikom.</translation>
    </message>
    <message>
        <source> from wallet '%1'</source>
        <translation type="unfinished">iz novčanika '%1'</translation>
    </message>
    <message>
        <source>%1 to '%2'</source>
        <translation type="unfinished">od %1 do '%2'</translation>
    </message>
    <message>
        <source>%1 to %2</source>
        <translation type="unfinished">%1 na %2</translation>
    </message>
    <message>
        <source>To review recipient list click "Show Details…"</source>
        <translation type="unfinished">Kliknite "Prikažite detalje..." kako biste pregledali popis primatelja</translation>
    </message>
    <message>
        <source>Sign failed</source>
        <translation type="unfinished">Potpis nije uspio</translation>
    </message>
    <message>
        <source>External signer not found</source>
        <extracomment>"External signer" means using devices such as hardware wallets.</extracomment>
        <translation type="unfinished">Vanjski potpisnik nije pronađen</translation>
    </message>
    <message>
        <source>External signer failure</source>
        <extracomment>"External signer" means using devices such as hardware wallets.</extracomment>
        <translation type="unfinished">Neuspješno vanjsko potpisivanje</translation>
    </message>
    <message>
        <source>Save Transaction Data</source>
        <translation type="unfinished">Spremi podatke transakcije</translation>
    </message>
    <message>
        <source>Partially Signed Transaction (Binary)</source>
        <extracomment>Expanded name of the binary PSBT file format. See: BIP 174.</extracomment>
        <translation type="unfinished">Djelomično potpisana transakcija (binarno)</translation>
    </message>
    <message>
        <source>PSBT saved</source>
        <extracomment>Popup message when a PSBT has been saved to a file</extracomment>
        <translation type="unfinished">PSBT spremljen</translation>
    </message>
    <message>
        <source>External balance:</source>
        <translation type="unfinished">Vanjski balans:</translation>
    </message>
    <message>
        <source>or</source>
        <translation type="unfinished">ili</translation>
    </message>
    <message>
        <source>You can increase the fee later (signals Replace-By-Fee, BIP-125).</source>
        <translation type="unfinished">Možete kasnije povećati naknadu (javlja Replace-By-Fee, BIP-125).</translation>
    </message>
    <message>
        <source>Please, review your transaction proposal. This will produce a Partially Signed Bitcoin Transaction (PSBT) which you can save or copy and then sign with e.g. an offline %1 wallet, or a PSBT-compatible hardware wallet.</source>
        <extracomment>Text to inform a user attempting to create a transaction of their current options. At this stage, a user can only create a PSBT. This string is displayed when private keys are disabled and an external signer is not available.</extracomment>
        <translation type="unfinished">Molimo pregledajte svoj prijedlog transakcije. Ovo će stvoriti djelomično potpisanu Bitcoin transakciju (PBST) koju možete spremiti ili kopirati i zatim potpisati sa npr. novčanikom %1 koji nije povezan s mrežom ili sa PSBT kompatibilnim hardverskim novčanikom.</translation>
    </message>
    <message>
        <source>Do you want to create this transaction?</source>
        <extracomment>Message displayed when attempting to create a transaction. Cautionary text to prompt the user to verify that the displayed transaction details represent the transaction the user intends to create.</extracomment>
        <translation type="unfinished">Želite li kreirati ovu transakciju?</translation>
    </message>
    <message>
        <source>Please, review your transaction. You can create and send this transaction or create a Partially Signed Bitcoin Transaction (PSBT), which you can save or copy and then sign with, e.g., an offline %1 wallet, or a PSBT-compatible hardware wallet.</source>
        <extracomment>Text to inform a user attempting to create a transaction of their current options. At this stage, a user can send their transaction or create a PSBT. This string is displayed when both private keys and PSBT controls are enabled.</extracomment>
        <translation type="unfinished">Molimo pregledajte svoju transakciju. Možete kreirarti i poslati ovu transakciju ili kreirati djelomično potpisanu Bitcoin transakciju (PBST) koju možete spremiti ili kopirati i zatim potpisati sa npr. novčanikom %1 koji nije povezan s mrežom ili sa PSBT kompatibilnim hardverskim novčanikom.</translation>
    </message>
    <message>
        <source>Please, review your transaction.</source>
        <extracomment>Text to prompt a user to review the details of the transaction they are attempting to send.</extracomment>
        <translation type="unfinished">Molim vas, pregledajte svoju transakciju.</translation>
    </message>
    <message>
        <source>Transaction fee</source>
        <translation type="unfinished">Naknada za transakciju</translation>
    </message>
    <message>
        <source>Not signalling Replace-By-Fee, BIP-125.</source>
        <translation type="unfinished">Ne javlja Replace-By-Fee, BIP-125.</translation>
    </message>
    <message>
        <source>Total Amount</source>
        <translation type="unfinished">Ukupni iznos</translation>
    </message>
    <message>
        <source>Confirm send coins</source>
        <translation type="unfinished">Potvrdi slanje novca</translation>
    </message>
    <message>
        <source>Watch-only balance:</source>
        <translation type="unfinished">Saldo samo za gledanje:</translation>
    </message>
    <message>
        <source>The recipient address is not valid. Please recheck.</source>
        <translation type="unfinished">Adresa primatelja je nevažeća. Provjerite ponovno, molim vas.</translation>
    </message>
    <message>
        <source>The amount to pay must be larger than 0.</source>
        <translation type="unfinished">Iznos mora biti veći od 0.</translation>
    </message>
    <message>
        <source>The amount exceeds your balance.</source>
        <translation type="unfinished">Iznos je veći od raspoložljivog stanja novčanika.</translation>
    </message>
    <message>
        <source>The total exceeds your balance when the %1 transaction fee is included.</source>
        <translation type="unfinished">Iznos je veći od stanja novčanika kad se doda naknada za transakcije od %1.</translation>
    </message>
    <message>
        <source>Duplicate address found: addresses should only be used once each.</source>
        <translation type="unfinished">Duplikatna adresa pronađena: adrese trebaju biti korištene samo jedanput.</translation>
    </message>
    <message>
        <source>Transaction creation failed!</source>
        <translation type="unfinished">Neuspješno stvorenje transakcije!</translation>
    </message>
    <message>
        <source>A fee higher than %1 is considered an absurdly high fee.</source>
        <translation type="unfinished">Naknada veća od %1 smatra se apsurdno visokim naknadom.</translation>
    </message>
    <message numerus="yes">
        <source>Estimated to begin confirmation within %n block(s).</source>
        <translation type="unfinished">
            <numerusform>Estimated to begin confirmation within %n block(s).</numerusform>
            <numerusform>Estimated to begin confirmation within %n block(s).</numerusform>
            <numerusform>Procijenjeno je da će potvrđivanje početi unutar %n blokova.</numerusform>
        </translation>
    </message>
    <message>
        <source>Warning: Invalid Bitcoin address</source>
        <translation type="unfinished">Upozorenje: Nevažeća Bitcoin adresa</translation>
    </message>
    <message>
        <source>Warning: Unknown change address</source>
        <translation type="unfinished">Upozorenje: Nepoznata adresa u koju će ostatak biti poslan</translation>
    </message>
    <message>
        <source>Confirm custom change address</source>
        <translation type="unfinished">Potvrdite zadanu adresu u koju će ostatak biti poslan</translation>
    </message>
    <message>
        <source>The address you selected for change is not part of this wallet. Any or all funds in your wallet may be sent to this address. Are you sure?</source>
        <translation type="unfinished">Adresa koju ste izabrali kamo ćete poslati ostatak nije dio ovog novčanika. Bilo koji iznosi u vašem novčaniku mogu biti poslani na ovu adresu. Jeste li sigurni?</translation>
    </message>
    <message>
        <source>(no label)</source>
        <translation type="unfinished">(nema oznake)</translation>
    </message>
</context>
<context>
    <name>SendCoinsEntry</name>
    <message>
        <source>A&amp;mount:</source>
        <translation type="unfinished">&amp;Iznos:</translation>
    </message>
    <message>
        <source>Pay &amp;To:</source>
        <translation type="unfinished">&amp;Primatelj plaćanja:</translation>
    </message>
    <message>
        <source>&amp;Label:</source>
        <translation type="unfinished">&amp;Oznaka:</translation>
    </message>
    <message>
        <source>Choose previously used address</source>
        <translation type="unfinished">Odaberite prethodno korištenu adresu</translation>
    </message>
    <message>
        <source>The Bitcoin address to send the payment to</source>
        <translation type="unfinished">Bitcoin adresa na koju ćete poslati uplatu</translation>
    </message>
    <message>
        <source>Paste address from clipboard</source>
        <translation type="unfinished">Zalijepi adresu iz međuspremnika</translation>
    </message>
    <message>
        <source>Remove this entry</source>
        <translation type="unfinished">Obrišite ovaj zapis</translation>
    </message>
    <message>
        <source>The amount to send in the selected unit</source>
        <translation type="unfinished">Iznos za slanje u odabranoj valuti </translation>
    </message>
    <message>
        <source>The fee will be deducted from the amount being sent. The recipient will receive less bitcoins than you enter in the amount field. If multiple recipients are selected, the fee is split equally.</source>
        <translation type="unfinished">Naknada će biti oduzeta od poslanog iznosa. Primatelj će primiti manji iznos od onoga koji unesete u polje iznosa. Ako je odabrano više primatelja, onda će naknada biti podjednako raspodijeljena.</translation>
    </message>
    <message>
        <source>S&amp;ubtract fee from amount</source>
        <translation type="unfinished">Oduzmite naknadu od iznosa</translation>
    </message>
    <message>
        <source>Use available balance</source>
        <translation type="unfinished">Koristite dostupno stanje</translation>
    </message>
    <message>
        <source>Message:</source>
        <translation type="unfinished">Poruka:</translation>
    </message>
    <message>
        <source>Enter a label for this address to add it to the list of used addresses</source>
        <translation type="unfinished">Unesite oznaku za ovu adresu kako bi ju dodali u vaš adresar</translation>
    </message>
    <message>
        <source>A message that was attached to the bitcoin: URI which will be stored with the transaction for your reference. Note: This message will not be sent over the Bitcoin network.</source>
        <translation type="unfinished">Poruka koja je dodana uplati: URI koji će biti spremljen s transakcijom za referencu. Napomena: Ova poruka neće biti poslana preko Bitcoin mreže.</translation>
    </message>
</context>
<context>
    <name>SendConfirmationDialog</name>
    <message>
        <source>Send</source>
        <translation type="unfinished">Pošalji</translation>
    </message>
    <message>
        <source>Create Unsigned</source>
        <translation type="unfinished">Kreiraj nepotpisano</translation>
    </message>
</context>
<context>
    <name>SignVerifyMessageDialog</name>
    <message>
        <source>Signatures - Sign / Verify a Message</source>
        <translation type="unfinished">Potpisi - Potpisujte / Provjerite poruku</translation>
    </message>
    <message>
        <source>&amp;Sign Message</source>
        <translation type="unfinished">&amp;Potpišite poruku</translation>
    </message>
    <message>
        <source>You can sign messages/agreements with your addresses to prove you can receive bitcoins sent to them. Be careful not to sign anything vague or random, as phishing attacks may try to trick you into signing your identity over to them. Only sign fully-detailed statements you agree to.</source>
        <translation type="unfinished">Možete potpisati poruke/dogovore svojim adresama kako biste dokazali da možete pristupiti bitcoinima poslanim na te adrese. Budite oprezni da ne potpisujte ništa nejasno ili nasumično, jer napadi phishingom vas mogu prevariti da prepišite svoj identitet njima. Potpisujte samo detaljno objašnjene izjave s kojima se slažete.</translation>
    </message>
    <message>
        <source>The Bitcoin address to sign the message with</source>
        <translation type="unfinished">Bitcoin adresa pomoću koje ćete potpisati poruku</translation>
    </message>
    <message>
        <source>Choose previously used address</source>
        <translation type="unfinished">Odaberite prethodno korištenu adresu</translation>
    </message>
    <message>
        <source>Paste address from clipboard</source>
        <translation type="unfinished">Zalijepi adresu iz međuspremnika</translation>
    </message>
    <message>
        <source>Enter the message you want to sign here</source>
        <translation type="unfinished">Upišite poruku koju želite potpisati ovdje</translation>
    </message>
    <message>
        <source>Signature</source>
        <translation type="unfinished">Potpis</translation>
    </message>
    <message>
        <source>Copy the current signature to the system clipboard</source>
        <translation type="unfinished">Kopirajte trenutni potpis u međuspremnik</translation>
    </message>
    <message>
        <source>Sign the message to prove you own this Bitcoin address</source>
        <translation type="unfinished">Potpišite poruku kako biste dokazali da posjedujete ovu Bitcoin adresu</translation>
    </message>
    <message>
        <source>Sign &amp;Message</source>
        <translation type="unfinished">&amp;Potpišite poruku</translation>
    </message>
    <message>
        <source>Reset all sign message fields</source>
        <translation type="unfinished">Resetirajte sva polja formulara</translation>
    </message>
    <message>
        <source>Clear &amp;All</source>
        <translation type="unfinished">Obriši &amp;sve</translation>
    </message>
    <message>
        <source>&amp;Verify Message</source>
        <translation type="unfinished">&amp;Potvrdite poruku</translation>
    </message>
    <message>
        <source>Enter the receiver's address, message (ensure you copy line breaks, spaces, tabs, etc. exactly) and signature below to verify the message. Be careful not to read more into the signature than what is in the signed message itself, to avoid being tricked by a man-in-the-middle attack. Note that this only proves the signing party receives with the address, it cannot prove sendership of any transaction!</source>
        <translation type="unfinished">Unesite primateljevu adresu, poruku (provjerite da kopirate prekide crta, razmake, tabove, itd. točno) i potpis ispod da provjerite poruku. Pazite da ne pridodate veće značenje potpisu nego što je sadržano u samoj poruci kako biste izbjegli napad posrednika (MITM attack). Primijetite da ovo samo dokazuje da stranka koja potpisuje prima na adresu. Ne može dokažati da je neka stranka poslala transakciju!</translation>
    </message>
    <message>
        <source>The Bitcoin address the message was signed with</source>
        <translation type="unfinished">Bitcoin adresa kojom je poruka potpisana</translation>
    </message>
    <message>
        <source>The signed message to verify</source>
        <translation type="unfinished">Potpisana poruka za provjeru</translation>
    </message>
    <message>
        <source>The signature given when the message was signed</source>
        <translation type="unfinished">Potpis predan kad je poruka bila potpisana</translation>
    </message>
    <message>
        <source>Verify the message to ensure it was signed with the specified Bitcoin address</source>
        <translation type="unfinished">Provjerite poruku da budete sigurni da je potpisana zadanom Bitcoin adresom</translation>
    </message>
    <message>
        <source>Verify &amp;Message</source>
        <translation type="unfinished">&amp;Potvrdite poruku</translation>
    </message>
    <message>
        <source>Reset all verify message fields</source>
        <translation type="unfinished">Resetirajte sva polja provjeravanja poruke</translation>
    </message>
    <message>
        <source>Click "Sign Message" to generate signature</source>
        <translation type="unfinished">Kliknite "Potpišite poruku" da generirate potpis</translation>
    </message>
    <message>
        <source>The entered address is invalid.</source>
        <translation type="unfinished">Unesena adresa je neispravna.</translation>
    </message>
    <message>
        <source>Please check the address and try again.</source>
        <translation type="unfinished">Molim provjerite adresu i pokušajte ponovo.</translation>
    </message>
    <message>
        <source>The entered address does not refer to a key.</source>
        <translation type="unfinished">Unesena adresa ne odnosi se na ključ.</translation>
    </message>
    <message>
        <source>Wallet unlock was cancelled.</source>
        <translation type="unfinished">Otključavanje novčanika je otkazano.</translation>
    </message>
    <message>
        <source>No error</source>
        <translation type="unfinished">Bez greške</translation>
    </message>
    <message>
        <source>Private key for the entered address is not available.</source>
        <translation type="unfinished">Privatni ključ za unesenu adresu nije dostupan.</translation>
    </message>
    <message>
        <source>Message signing failed.</source>
        <translation type="unfinished">Potpisivanje poruke neuspješno.</translation>
    </message>
    <message>
        <source>Message signed.</source>
        <translation type="unfinished">Poruka je potpisana.</translation>
    </message>
    <message>
        <source>The signature could not be decoded.</source>
        <translation type="unfinished">Potpis nije mogao biti dešifriran.</translation>
    </message>
    <message>
        <source>Please check the signature and try again.</source>
        <translation type="unfinished">Molim provjerite potpis i pokušajte ponovo.</translation>
    </message>
    <message>
        <source>The signature did not match the message digest.</source>
        <translation type="unfinished">Potpis se ne poklapa sa sažetkom poruke (message digest).</translation>
    </message>
    <message>
        <source>Message verification failed.</source>
        <translation type="unfinished">Provjera poruke neuspješna.</translation>
    </message>
    <message>
        <source>Message verified.</source>
        <translation type="unfinished">Poruka provjerena.</translation>
    </message>
</context>
<context>
    <name>SplashScreen</name>
    <message>
        <source>(press q to shutdown and continue later)</source>
        <translation type="unfinished">(pritisnite q kako bi ugasili i nastavili kasnije)</translation>
    </message>
    <message>
        <source>press q to shutdown</source>
        <translation type="unfinished">pritisnite q za gašenje</translation>
    </message>
</context>
<context>
    <name>TransactionDesc</name>
    <message>
        <source>conflicted with a transaction with %1 confirmations</source>
        <extracomment>Text explaining the current status of a transaction, shown in the status field of the details window for this transaction. This status represents an unconfirmed transaction that conflicts with a confirmed transaction.</extracomment>
        <translation type="unfinished">subokljen s transakcijom broja potvrde %1</translation>
    </message>
    <message>
        <source>abandoned</source>
        <extracomment>Text explaining the current status of a transaction, shown in the status field of the details window for this transaction. This status represents an abandoned transaction.</extracomment>
        <translation type="unfinished">napušteno</translation>
    </message>
    <message>
        <source>%1/unconfirmed</source>
        <extracomment>Text explaining the current status of a transaction, shown in the status field of the details window for this transaction. This status represents a transaction confirmed in at least one block, but less than 6 blocks.</extracomment>
        <translation type="unfinished">%1/nepotvrđeno</translation>
    </message>
    <message>
        <source>%1 confirmations</source>
        <extracomment>Text explaining the current status of a transaction, shown in the status field of the details window for this transaction. This status represents a transaction confirmed in 6 or more blocks.</extracomment>
        <translation type="unfinished">%1 potvrda</translation>
    </message>
    <message>
        <source>Date</source>
        <translation type="unfinished">Datum</translation>
    </message>
    <message>
        <source>Source</source>
        <translation type="unfinished">Izvor</translation>
    </message>
    <message>
        <source>Generated</source>
        <translation type="unfinished">Generiran</translation>
    </message>
    <message>
        <source>From</source>
        <translation type="unfinished">Od</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation type="unfinished">nepoznato</translation>
    </message>
    <message>
        <source>To</source>
        <translation type="unfinished">Za</translation>
    </message>
    <message>
        <source>own address</source>
        <translation type="unfinished">vlastita adresa</translation>
    </message>
    <message>
        <source>watch-only</source>
        <translation type="unfinished">isključivo promatrano</translation>
    </message>
    <message>
        <source>label</source>
        <translation type="unfinished">oznaka</translation>
    </message>
    <message>
        <source>Credit</source>
        <translation type="unfinished">Uplaćeno</translation>
    </message>
    <message numerus="yes">
        <source>matures in %n more block(s)</source>
        <translation type="unfinished">
            <numerusform>matures in %n more block(s)</numerusform>
            <numerusform>matures in %n more block(s)</numerusform>
            <numerusform>dozrijeva za još %n blokova</numerusform>
        </translation>
    </message>
    <message>
        <source>not accepted</source>
        <translation type="unfinished">Nije prihvaćeno</translation>
    </message>
    <message>
        <source>Debit</source>
        <translation type="unfinished">Zaduženje</translation>
    </message>
    <message>
        <source>Total debit</source>
        <translation type="unfinished">Ukupni debit</translation>
    </message>
    <message>
        <source>Total credit</source>
        <translation type="unfinished">Ukupni kredit</translation>
    </message>
    <message>
        <source>Transaction fee</source>
        <translation type="unfinished">Naknada za transakciju</translation>
    </message>
    <message>
        <source>Net amount</source>
        <translation type="unfinished">Neto iznos</translation>
    </message>
    <message>
        <source>Message</source>
        <translation type="unfinished">Poruka</translation>
    </message>
    <message>
        <source>Comment</source>
        <translation type="unfinished">Komentar</translation>
    </message>
    <message>
        <source>Transaction ID</source>
        <translation type="unfinished">ID transakcije</translation>
    </message>
    <message>
        <source>Transaction total size</source>
        <translation type="unfinished">Ukupna veličina transakcije</translation>
    </message>
    <message>
        <source>Transaction virtual size</source>
        <translation type="unfinished">Virtualna veličina transakcije</translation>
    </message>
    <message>
        <source>Output index</source>
        <translation type="unfinished">Indeks outputa</translation>
    </message>
    <message>
        <source> (Certificate was not verified)</source>
        <translation type="unfinished">(Certifikat nije bio ovjeren)</translation>
    </message>
    <message>
        <source>Merchant</source>
        <translation type="unfinished">Trgovac</translation>
    </message>
    <message>
        <source>Generated coins must mature %1 blocks before they can be spent. When you generated this block, it was broadcast to the network to be added to the block chain. If it fails to get into the chain, its state will change to "not accepted" and it won't be spendable. This may occasionally happen if another node generates a block within a few seconds of yours.</source>
        <translation type="unfinished">Generirani novčići moraju dozrijeti %1 blokova prije nego što mogu biti potrošeni. Kada ste generirali ovaj blok, bio je emitiran na mreži kako bi bio dodan lancu blokova. Ako ne uspije ući u lanac, stanje će mu promijeniti na "neprihvaćeno" i neće se moći trošiti. Ovo se može dogoditi povremeno ako drugi čvor generira blok u roku od nekoliko sekundi od vas.</translation>
    </message>
    <message>
        <source>Debug information</source>
        <translation type="unfinished">Informacije za debugiranje</translation>
    </message>
    <message>
        <source>Transaction</source>
        <translation type="unfinished">Transakcija</translation>
    </message>
    <message>
        <source>Inputs</source>
        <translation type="unfinished">Unosi</translation>
    </message>
    <message>
        <source>Amount</source>
        <translation type="unfinished">Iznos</translation>
    </message>
    <message>
        <source>true</source>
        <translation type="unfinished">istina</translation>
    </message>
    <message>
        <source>false</source>
        <translation type="unfinished">laž</translation>
    </message>
</context>
<context>
    <name>TransactionDescDialog</name>
    <message>
        <source>This pane shows a detailed description of the transaction</source>
        <translation type="unfinished">Ovaj prozor prikazuje detaljni opis transakcije</translation>
    </message>
    <message>
        <source>Details for %1</source>
        <translation type="unfinished">Detalji za %1</translation>
    </message>
</context>
<context>
    <name>TransactionTableModel</name>
    <message>
        <source>Date</source>
        <translation type="unfinished">Datum</translation>
    </message>
    <message>
        <source>Type</source>
        <translation type="unfinished">Tip</translation>
    </message>
    <message>
        <source>Label</source>
        <translation type="unfinished">Oznaka</translation>
    </message>
    <message>
        <source>Unconfirmed</source>
        <translation type="unfinished">Nepotvrđeno</translation>
    </message>
    <message>
        <source>Abandoned</source>
        <translation type="unfinished">Napušteno</translation>
    </message>
    <message>
        <source>Confirming (%1 of %2 recommended confirmations)</source>
        <translation type="unfinished">Potvrđuje se (%1 od %2 preporučenih potvrda)</translation>
    </message>
    <message>
        <source>Confirmed (%1 confirmations)</source>
        <translation type="unfinished">Potvrđen (%1 potvrda)</translation>
    </message>
    <message>
        <source>Conflicted</source>
        <translation type="unfinished">Sukobljeno</translation>
    </message>
    <message>
        <source>Immature (%1 confirmations, will be available after %2)</source>
        <translation type="unfinished">Nezrelo (%1 potvrda/e, bit će dostupno nakon %2)</translation>
    </message>
    <message>
        <source>Generated but not accepted</source>
        <translation type="unfinished">Generirano, ali nije prihvaćeno</translation>
    </message>
    <message>
        <source>Received with</source>
        <translation type="unfinished">Primljeno s</translation>
    </message>
    <message>
        <source>Received from</source>
        <translation type="unfinished">Primljeno od</translation>
    </message>
    <message>
        <source>Sent to</source>
        <translation type="unfinished">Poslano za</translation>
    </message>
    <message>
        <source>Payment to yourself</source>
        <translation type="unfinished">Plaćanje samom sebi</translation>
    </message>
    <message>
        <source>Mined</source>
        <translation type="unfinished">Rudareno</translation>
    </message>
    <message>
        <source>watch-only</source>
        <translation type="unfinished">isključivo promatrano</translation>
    </message>
    <message>
        <source>(n/a)</source>
        <translation type="unfinished">(n/d)</translation>
    </message>
    <message>
        <source>(no label)</source>
        <translation type="unfinished">(nema oznake)</translation>
    </message>
    <message>
        <source>Transaction status. Hover over this field to show number of confirmations.</source>
        <translation type="unfinished">Status transakcije</translation>
    </message>
    <message>
        <source>Date and time that the transaction was received.</source>
        <translation type="unfinished">Datum i vrijeme kad je transakcija primljena</translation>
    </message>
    <message>
        <source>Type of transaction.</source>
        <translation type="unfinished">Vrsta transakcije.</translation>
    </message>
    <message>
        <source>Whether or not a watch-only address is involved in this transaction.</source>
        <translation type="unfinished">Ovisi je li isključivo promatrana adresa povezana s ovom transakcijom ili ne.</translation>
    </message>
    <message>
        <source>User-defined intent/purpose of the transaction.</source>
        <translation type="unfinished">Korisničko definirana namjera transakcije.</translation>
    </message>
    <message>
        <source>Amount removed from or added to balance.</source>
        <translation type="unfinished">Iznos odbijen od ili dodan k saldu.</translation>
    </message>
</context>
<context>
    <name>TransactionView</name>
    <message>
        <source>All</source>
        <translation type="unfinished">Sve</translation>
    </message>
    <message>
        <source>Today</source>
        <translation type="unfinished">Danas</translation>
    </message>
    <message>
        <source>This week</source>
        <translation type="unfinished">Ovaj tjedan</translation>
    </message>
    <message>
        <source>This month</source>
        <translation type="unfinished">Ovaj mjesec</translation>
    </message>
    <message>
        <source>Last month</source>
        <translation type="unfinished">Prošli mjesec</translation>
    </message>
    <message>
        <source>This year</source>
        <translation type="unfinished">Ove godine</translation>
    </message>
    <message>
        <source>Received with</source>
        <translation type="unfinished">Primljeno s</translation>
    </message>
    <message>
        <source>Sent to</source>
        <translation type="unfinished">Poslano za</translation>
    </message>
    <message>
        <source>To yourself</source>
        <translation type="unfinished">Samom sebi</translation>
    </message>
    <message>
        <source>Mined</source>
        <translation type="unfinished">Rudareno</translation>
    </message>
    <message>
        <source>Other</source>
        <translation type="unfinished">Ostalo</translation>
    </message>
    <message>
        <source>Enter address, transaction id, or label to search</source>
        <translation type="unfinished">Unesite adresu, ID transakcije ili oznaku za pretragu</translation>
    </message>
    <message>
        <source>Min amount</source>
        <translation type="unfinished">Min iznos</translation>
    </message>
    <message>
        <source>Range…</source>
        <translation type="unfinished">Raspon...</translation>
    </message>
    <message>
        <source>&amp;Copy address</source>
        <translation type="unfinished">&amp;Kopiraj adresu</translation>
    </message>
    <message>
        <source>Copy &amp;label</source>
        <translation type="unfinished">Kopiraj &amp;oznaku</translation>
    </message>
    <message>
        <source>Copy &amp;amount</source>
        <translation type="unfinished">Kopiraj &amp;iznos</translation>
    </message>
    <message>
        <source>Copy transaction &amp;ID</source>
        <translation type="unfinished">Kopiraj &amp;ID transakcije</translation>
    </message>
    <message>
        <source>Copy &amp;raw transaction</source>
        <translation type="unfinished">Kopiraj &amp;sirovu transakciju</translation>
    </message>
    <message>
        <source>Copy full transaction &amp;details</source>
        <translation type="unfinished">Kopiraj sve transakcijske &amp;detalje</translation>
    </message>
    <message>
        <source>&amp;Show transaction details</source>
        <translation type="unfinished">&amp;Prikaži detalje transakcije</translation>
    </message>
    <message>
        <source>Increase transaction &amp;fee</source>
        <translation type="unfinished">Povećaj transakcijsku &amp;naknadu</translation>
    </message>
    <message>
        <source>A&amp;bandon transaction</source>
        <translation type="unfinished">&amp;Napusti transakciju</translation>
    </message>
    <message>
        <source>&amp;Edit address label</source>
        <translation type="unfinished">&amp;Izmjeni oznaku adrese</translation>
    </message>
    <message>
        <source>Show in %1</source>
        <extracomment>Transactions table context menu action to show the selected transaction in a third-party block explorer. %1 is a stand-in argument for the URL of the explorer.</extracomment>
        <translation type="unfinished">Prikazi u %1</translation>
    </message>
    <message>
        <source>Export Transaction History</source>
        <translation type="unfinished">Izvozite povijest transakcija</translation>
    </message>
    <message>
        <source>Comma separated file</source>
        <extracomment>Expanded name of the CSV file format. See: https://en.wikipedia.org/wiki/Comma-separated_values.</extracomment>
        <translation type="unfinished">Datoteka podataka odvojenih zarezima (*.csv)</translation>
    </message>
    <message>
        <source>Confirmed</source>
        <translation type="unfinished">Potvrđeno</translation>
    </message>
    <message>
        <source>Watch-only</source>
        <translation type="unfinished">Isključivo promatrano</translation>
    </message>
    <message>
        <source>Date</source>
        <translation type="unfinished">Datum</translation>
    </message>
    <message>
        <source>Type</source>
        <translation type="unfinished">Tip</translation>
    </message>
    <message>
        <source>Label</source>
        <translation type="unfinished">Oznaka</translation>
    </message>
    <message>
        <source>Address</source>
        <translation type="unfinished">Adresa</translation>
    </message>
    <message>
        <source>Exporting Failed</source>
        <translation type="unfinished">Izvoz neuspješan</translation>
    </message>
    <message>
        <source>There was an error trying to save the transaction history to %1.</source>
        <translation type="unfinished">Nastala je greška pokušavajući snimiti povijest transakcija na %1.</translation>
    </message>
    <message>
        <source>Exporting Successful</source>
        <translation type="unfinished">Izvoz uspješan</translation>
    </message>
    <message>
        <source>The transaction history was successfully saved to %1.</source>
        <translation type="unfinished">Povijest transakcija je bila uspješno snimljena na %1.</translation>
    </message>
    <message>
        <source>Range:</source>
        <translation type="unfinished">Raspon:</translation>
    </message>
    <message>
        <source>to</source>
        <translation type="unfinished">za</translation>
    </message>
</context>
<context>
    <name>WalletFrame</name>
    <message>
        <source>No wallet has been loaded.
Go to File &gt; Open Wallet to load a wallet.
- OR -</source>
        <translation type="unfinished">Nijedan novčanik nije učitan.
Idi na Datoteka &gt;  Otvori novčanik za učitanje novčanika.
- ILI -</translation>
    </message>
    <message>
        <source>Create a new wallet</source>
        <translation type="unfinished">Stvorite novi novčanik</translation>
    </message>
    <message>
        <source>Error</source>
        <translation type="unfinished">Greška</translation>
    </message>
    <message>
        <source>Unable to decode PSBT from clipboard (invalid base64)</source>
        <translation type="unfinished">Nije moguće dekodirati PSBT iz međuspremnika (nevažeći base64)</translation>
    </message>
    <message>
        <source>Load Transaction Data</source>
        <translation type="unfinished">Učitaj podatke transakcije</translation>
    </message>
    <message>
        <source>Partially Signed Transaction (*.psbt)</source>
        <translation type="unfinished">Djelomično potpisana transakcija (*.psbt)</translation>
    </message>
    <message>
        <source>PSBT file must be smaller than 100 MiB</source>
        <translation type="unfinished">PSBT datoteka mora biti manja od 100 MB</translation>
    </message>
    <message>
        <source>Unable to decode PSBT</source>
        <translation type="unfinished">Nije moguće dekodirati PSBT</translation>
    </message>
</context>
<context>
    <name>WalletModel</name>
    <message>
        <source>Send Coins</source>
        <translation type="unfinished">Slanje novca</translation>
    </message>
    <message>
        <source>Fee bump error</source>
        <translation type="unfinished">Greška kod povećanja naknade</translation>
    </message>
    <message>
        <source>Increasing transaction fee failed</source>
        <translation type="unfinished">Povećavanje transakcijske naknade neuspješno</translation>
    </message>
    <message>
        <source>Do you want to increase the fee?</source>
        <extracomment>Asks a user if they would like to manually increase the fee of a transaction that has already been created.</extracomment>
        <translation type="unfinished">Želite li povećati naknadu?</translation>
    </message>
    <message>
        <source>Current fee:</source>
        <translation type="unfinished">Trenutna naknada:</translation>
    </message>
    <message>
        <source>Increase:</source>
        <translation type="unfinished">Povećanje:</translation>
    </message>
    <message>
        <source>New fee:</source>
        <translation type="unfinished">Nova naknada:</translation>
    </message>
    <message>
        <source>Warning: This may pay the additional fee by reducing change outputs or adding inputs, when necessary. It may add a new change output if one does not already exist. These changes may potentially leak privacy.</source>
        <translation type="unfinished">Upozorenje: Ovo može platiti dodatnu naknadu smanjenjem change outputa ili dodavanjem inputa, po potrebi. Može dodati novi change output ako jedan već ne postoji. Ove promjene bi mogle smanjiti privatnost.</translation>
    </message>
    <message>
        <source>Confirm fee bump</source>
        <translation type="unfinished">Potvrdite povećanje naknade</translation>
    </message>
    <message>
        <source>Can't draft transaction.</source>
        <translation type="unfinished">Nije moguće pripremiti nacrt transakcije</translation>
    </message>
    <message>
        <source>PSBT copied</source>
        <translation type="unfinished">PSBT kopiran</translation>
    </message>
    <message>
        <source>Can't sign transaction.</source>
        <translation type="unfinished">Transakcija ne može biti potpisana.</translation>
    </message>
    <message>
        <source>Could not commit transaction</source>
        <translation type="unfinished">Transakcija ne može biti izvršena.</translation>
    </message>
    <message>
        <source>Can't display address</source>
        <translation type="unfinished">Ne mogu prikazati adresu</translation>
    </message>
    <message>
        <source>default wallet</source>
        <translation type="unfinished">uobičajeni novčanik</translation>
    </message>
</context>
<context>
    <name>WalletView</name>
    <message>
        <source>&amp;Export</source>
        <translation type="unfinished">&amp;Izvezite</translation>
    </message>
    <message>
        <source>Export the data in the current tab to a file</source>
        <translation type="unfinished">Izvezite podatke iz trenutne kartice u datoteku</translation>
    </message>
    <message>
        <source>Backup Wallet</source>
        <translation type="unfinished">Arhiviranje novčanika</translation>
    </message>
    <message>
        <source>Wallet Data</source>
        <extracomment>Name of the wallet data file format.</extracomment>
        <translation type="unfinished">Podaci novčanika</translation>
    </message>
    <message>
        <source>Backup Failed</source>
        <translation type="unfinished">Arhiviranje nije uspjelo</translation>
    </message>
    <message>
        <source>There was an error trying to save the wallet data to %1.</source>
        <translation type="unfinished">Nastala je greška pokušavajući snimiti podatke novčanika na %1.</translation>
    </message>
    <message>
        <source>Backup Successful</source>
        <translation type="unfinished">Sigurnosna kopija uspješna</translation>
    </message>
    <message>
        <source>The wallet data was successfully saved to %1.</source>
        <translation type="unfinished">Podaci novčanika su bili uspješno snimljeni na %1.</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation type="unfinished">Odustanite</translation>
    </message>
</context>
<context>
    <name>bitcoin-core</name>
    <message>
        <source>The %s developers</source>
        <translation type="unfinished">Ekipa %s</translation>
    </message>
    <message>
        <source>%s corrupt. Try using the wallet tool bitcoin-wallet to salvage or restoring a backup.</source>
        <translation type="unfinished">%s korumpirano. Pokušajte koristiti bitcoin-wallet alat za novčanike kako biste ga spasili ili pokrenuti sigurnosnu kopiju.</translation>
    </message>
    <message>
        <source>Cannot downgrade wallet from version %i to version %i. Wallet version unchanged.</source>
        <translation type="unfinished">Nije moguće unazaditi novčanik s verzije %i na verziju %i. Verzija novčanika nepromijenjena.</translation>
    </message>
    <message>
        <source>Cannot obtain a lock on data directory %s. %s is probably already running.</source>
        <translation type="unfinished">Program ne može pristupiti podatkovnoj mapi %s. %s je vjerojatno već pokrenut.</translation>
    </message>
    <message>
        <source>Cannot upgrade a non HD split wallet from version %i to version %i without upgrading to support pre-split keypool. Please use version %i or no version specified.</source>
        <translation type="unfinished">Nije moguće unaprijediti podijeljeni novčanik bez HD-a s verzije %i na verziju %i bez unaprijeđenja na potporu pred-podjelnog bazena ključeva. Molimo koristite verziju %i ili neku drugu.</translation>
    </message>
    <message>
        <source>Distributed under the MIT software license, see the accompanying file %s or %s</source>
        <translation type="unfinished">Distribuirano pod MIT licencom softvera. Vidite pripadajuću datoteku %s ili %s.</translation>
    </message>
    <message>
        <source>Error reading %s! All keys read correctly, but transaction data or address book entries might be missing or incorrect.</source>
        <translation type="unfinished">Greška kod iščitanja %s! Svi ključevi su ispravno učitani, ali transakcijski podaci ili zapisi u adresaru mogu biti nepotpuni ili netočni.</translation>
    </message>
    <message>
        <source>Error reading %s! Transaction data may be missing or incorrect. Rescanning wallet.</source>
        <translation type="unfinished">Greška u čitanju %s! Transakcijski podaci nedostaju ili su netočni. Ponovno skeniranje novčanika.</translation>
    </message>
    <message>
        <source>Error: Dumpfile format record is incorrect. Got "%s", expected "format".</source>
        <translation type="unfinished">Greška: Format dumpfile zapisa je netočan. Dobiven "%s" očekivani "format".</translation>
    </message>
    <message>
        <source>Error: Dumpfile identifier record is incorrect. Got "%s", expected "%s".</source>
        <translation type="unfinished">Greška: Identifikator dumpfile zapisa je netočan. Dobiven "%s", očekivan "%s".</translation>
    </message>
    <message>
        <source>Error: Dumpfile version is not supported. This version of bitcoin-wallet only supports version 1 dumpfiles. Got dumpfile with version %s</source>
        <translation type="unfinished">Greška: Dumpfile verzija nije podržana. Ova bitcoin-wallet  verzija podržava  samo dumpfile verziju 1. Dobiven dumpfile s verzijom %s</translation>
    </message>
    <message>
        <source>Error: Legacy wallets only support the "legacy", "p2sh-segwit", and "bech32" address types</source>
        <translation type="unfinished">Greška: Legacy novčanici podržavaju samo "legacy", "p2sh-segwit", i "bech32" tipove adresa</translation>
    </message>
    <message>
        <source>File %s already exists. If you are sure this is what you want, move it out of the way first.</source>
        <translation type="unfinished">Datoteka %s već postoji. Ako ste sigurni da ovo želite, prvo ju maknite, </translation>
    </message>
    <message>
        <source>Invalid or corrupt peers.dat (%s). If you believe this is a bug, please report it to %s. As a workaround, you can move the file (%s) out of the way (rename, move, or delete) to have a new one created on the next start.</source>
        <translation type="unfinished">Nevažeći ili korumpirani peers.dat (%s). Ako mislite da je ovo bug, molimo prijavite %s. Kao alternativno rješenje, možete maknuti datoteku (%s) (preimenuj, makni ili obriši) kako bi se kreirala nova na idućem pokretanju.</translation>
    </message>
    <message>
        <source>More than one onion bind address is provided. Using %s for the automatically created Tor onion service.</source>
        <translation type="unfinished">Pruženo je više od jedne onion bind adrese. Koristim %s za automatski stvorenu Tor onion uslugu.</translation>
    </message>
    <message>
        <source>No dump file provided. To use createfromdump, -dumpfile=&lt;filename&gt; must be provided.</source>
        <translation type="unfinished">Dump datoteka nije automatski dostupna. Kako biste koristili createfromdump, -dumpfile=&lt;filename&gt; mora biti osiguran. </translation>
    </message>
    <message>
        <source>No dump file provided. To use dump, -dumpfile=&lt;filename&gt; must be provided.</source>
        <translation type="unfinished">Dump datoteka nije automatski dostupna. Kako biste koristili dump, -dumpfile=&lt;filename&gt; mora biti osiguran. </translation>
    </message>
    <message>
        <source>No wallet file format provided. To use createfromdump, -format=&lt;format&gt; must be provided.</source>
        <translation type="unfinished">Format datoteke novčanika nije dostupan. Kako biste koristili reatefromdump, -format=&lt;format&gt; mora biti osiguran.</translation>
    </message>
    <message>
        <source>Please check that your computer's date and time are correct! If your clock is wrong, %s will not work properly.</source>
        <translation type="unfinished">Molimo provjerite jesu li datum i vrijeme na vašem računalu točni. Ako je vaš sat krivo namješten, %s neće raditi ispravno.</translation>
    </message>
    <message>
        <source>Please contribute if you find %s useful. Visit %s for further information about the software.</source>
        <translation type="unfinished">Molimo vas da doprinijete programu %s ako ga smatrate korisnim. Posjetite %s za više informacija.</translation>
    </message>
    <message>
        <source>Prune configured below the minimum of %d MiB.  Please use a higher number.</source>
        <translation type="unfinished">Obrezivanje postavljeno ispod minimuma od %d MiB. Molim koristite veći broj.</translation>
    </message>
    <message>
        <source>Prune: last wallet synchronisation goes beyond pruned data. You need to -reindex (download the whole blockchain again in case of pruned node)</source>
        <translation type="unfinished">Obrezivanje: zadnja sinkronizacija novčanika ide dalje od obrezivanih podataka. Morate koristiti -reindex (ponovo preuzeti cijeli lanac blokova u slučaju obrezivanog čvora)</translation>
    </message>
    <message>
        <source>SQLiteDatabase: Unknown sqlite wallet schema version %d. Only version %d is supported</source>
        <translation type="unfinished">SQLiteDatabase: Nepoznata sqlite shema novčanika verzija %d. Podržana je samo verzija %d.</translation>
    </message>
    <message>
        <source>The block database contains a block which appears to be from the future. This may be due to your computer's date and time being set incorrectly. Only rebuild the block database if you are sure that your computer's date and time are correct</source>
        <translation type="unfinished">Baza blokova sadrži blok koji je naizgled iz budućnosti. Može to biti posljedica krivo namještenog datuma i vremena na vašem računalu. Obnovite bazu blokova samo ako ste sigurni da su točni datum i vrijeme na vašem računalu.</translation>
    </message>
    <message>
        <source>The block index db contains a legacy 'txindex'. To clear the occupied disk space, run a full -reindex, otherwise ignore this error. This error message will not be displayed again.</source>
        <translation type="unfinished">Index bloka db sadrži legacy 'txindex'. Kako biste očistili zauzeti prostor na disku, pokrenite puni -reindex ili ignorirajte ovu grešku. Ova greška neće biti ponovno prikazana.</translation>
    </message>
    <message>
        <source>The transaction amount is too small to send after the fee has been deducted</source>
        <translation type="unfinished">Iznos transakcije je premalen za poslati nakon naknade</translation>
    </message>
    <message>
        <source>This error could occur if this wallet was not shutdown cleanly and was last loaded using a build with a newer version of Berkeley DB. If so, please use the software that last loaded this wallet</source>
        <translation type="unfinished">Ova greška bi se mogla dogoditi kada se ovaj novčanik ne ugasi pravilno i ako je posljednji put bio podignut koristeći noviju verziju Berkeley DB. Ako je tako, molimo koristite softver kojim je novčanik podignut zadnji put.</translation>
    </message>
    <message>
        <source>This is a pre-release test build - use at your own risk - do not use for mining or merchant applications</source>
        <translation type="unfinished">Ovo je eksperimentalna verzija za testiranje - koristite je na vlastitu odgovornost - ne koristite je za rudarenje ili trgovačke primjene</translation>
    </message>
    <message>
        <source>This is the maximum transaction fee you pay (in addition to the normal fee) to prioritize partial spend avoidance over regular coin selection.</source>
        <translation type="unfinished">Ovo je najveća transakcijska naknada koju plaćate (uz normalnu naknadu) kako biste prioritizirali izbjegavanje djelomične potrošnje nad uobičajenom selekcijom sredstava.</translation>
    </message>
    <message>
        <source>This is the transaction fee you may discard if change is smaller than dust at this level</source>
        <translation type="unfinished">Ovo je transakcijska naknada koju možete odbaciti ako je ostatak manji od "prašine" (sićušnih iznosa) po ovoj stopi</translation>
    </message>
    <message>
        <source>This is the transaction fee you may pay when fee estimates are not available.</source>
        <translation type="unfinished">Ovo je transakcijska naknada koju ćete možda platiti kada su nedostupne procjene naknada.</translation>
    </message>
    <message>
        <source>Total length of network version string (%i) exceeds maximum length (%i). Reduce the number or size of uacomments.</source>
        <translation type="unfinished">Ukupna duljina stringa verzije mreže (%i) prelazi maksimalnu duljinu (%i). Smanjite broj ili veličinu komentara o korisničkom agentu (uacomments).</translation>
    </message>
    <message>
        <source>Unable to replay blocks. You will need to rebuild the database using -reindex-chainstate.</source>
        <translation type="unfinished">Ne mogu se ponovo odigrati blokovi. Morat ćete ponovo složiti bazu koristeći -reindex-chainstate.</translation>
    </message>
    <message>
        <source>Unknown wallet file format "%s" provided. Please provide one of "bdb" or "sqlite".</source>
        <translation type="unfinished">Nepoznati formant novčanika "%s" pružen. Molimo dostavite "bdb" ili "sqlite".</translation>
    </message>
    <message>
        <source>Warning: Dumpfile wallet format "%s" does not match command line specified format "%s".</source>
        <translation type="unfinished">Upozorenje: Dumpfile format novčanika "%s" se ne poklapa sa formatom komandne linije "%s".</translation>
    </message>
    <message>
        <source>Warning: Private keys detected in wallet {%s} with disabled private keys</source>
        <translation type="unfinished">Upozorenje: Privatni ključevi pronađeni u novčaniku {%s} s isključenim privatnim ključevima</translation>
    </message>
    <message>
        <source>Warning: We do not appear to fully agree with our peers! You may need to upgrade, or other nodes may need to upgrade.</source>
        <translation type="unfinished">Upozorenje: Izgleda da se ne slažemo u potpunosti s našim klijentima! Možda ćete se vi ili ostali čvorovi morati ažurirati.</translation>
    </message>
    <message>
        <source>Witness data for blocks after height %d requires validation. Please restart with -reindex.</source>
        <translation type="unfinished">Podaci svjedoka za blokove poslije visine %d zahtijevaju validaciju. Molimo restartirajte sa -reindex.</translation>
    </message>
    <message>
        <source>You need to rebuild the database using -reindex to go back to unpruned mode.  This will redownload the entire blockchain</source>
        <translation type="unfinished">Morat ćete ponovno složiti bazu koristeći -reindex kako biste se vratili na neobrezivan način (unpruned mode). Ovo će ponovno preuzeti cijeli lanac blokova.</translation>
    </message>
    <message>
        <source>%s is set very high!</source>
        <translation type="unfinished">%s je postavljen preveliko!</translation>
    </message>
    <message>
        <source>-maxmempool must be at least %d MB</source>
        <translation type="unfinished">-maxmempool mora biti barem %d MB</translation>
    </message>
    <message>
        <source>A fatal internal error occurred, see debug.log for details</source>
        <translation type="unfinished">Dogodila se kobna greška, vidi detalje u debug.log.</translation>
    </message>
    <message>
        <source>Cannot resolve -%s address: '%s'</source>
        <translation type="unfinished">Ne može se razriješiti adresa -%s: '%s'</translation>
    </message>
    <message>
        <source>Cannot set -forcednsseed to true when setting -dnsseed to false.</source>
        <translation type="unfinished">Nije moguće postaviti -forcednsseed na true kada je postavka za  -dnsseed false.</translation>
    </message>
    <message>
        <source>Cannot set -peerblockfilters without -blockfilterindex.</source>
        <translation type="unfinished">Nije moguće postaviti -peerblockfilters bez -blockfilterindex.</translation>
    </message>
    <message>
        <source>Cannot write to data directory '%s'; check permissions.</source>
        <translation type="unfinished">Nije moguće pisati u podatkovnu mapu '%s'; provjerite dozvole.</translation>
    </message>
    <message>
        <source>The -txindex upgrade started by a previous version cannot be completed. Restart with the previous version or run a full -reindex.</source>
        <translation type="unfinished">Unaprijeđenje  -txindex koje za započela prijašnja verzija nije moguće završiti. Ponovno pokrenite s prethodnom verzijom ili pokrenite potpuni -reindex.</translation>
    </message>
    <message>
        <source>Cannot provide specific connections and have addrman find outgoing connections at the same time.</source>
        <translation type="unfinished">Nije moguće ponuditi specifične veze i istovremeno dati addrman da traži izlazne veze.</translation>
    </message>
    <message>
        <source>Error loading %s: External signer wallet being loaded without external signer support compiled</source>
        <translation type="unfinished">Pogreška pri učitavanju %s: Vanjski potpisni novčanik se učitava bez kompajlirane potpore vanjskog potpisnika</translation>
    </message>
    <message>
        <source>Failed to rename invalid peers.dat file. Please move or delete it and try again.</source>
        <translation type="unfinished">Preimenovanje nevažeće peers.dat datoteke neuspješno. Molimo premjestite ili obrišite datoteku i pokušajte ponovno.</translation>
    </message>
    <message>
        <source>Config setting for %s only applied on %s network when in [%s] section.</source>
        <translation type="unfinished">Konfiguriranje postavki za %s primijenjeno je samo na %s mreži u odjeljku [%s].</translation>
    </message>
    <message>
        <source>Corrupted block database detected</source>
        <translation type="unfinished">Pokvarena baza blokova otkrivena</translation>
    </message>
    <message>
        <source>Could not find asmap file %s</source>
        <translation type="unfinished">Nije pronađena asmap datoteka %s</translation>
    </message>
    <message>
        <source>Could not parse asmap file %s</source>
        <translation type="unfinished">Nije moguće pročitati asmap datoteku %s</translation>
    </message>
    <message>
        <source>Disk space is too low!</source>
        <translation type="unfinished">Nema dovoljno prostora na disku!</translation>
    </message>
    <message>
        <source>Do you want to rebuild the block database now?</source>
        <translation type="unfinished">Želite li sada obnoviti bazu blokova?</translation>
    </message>
    <message>
        <source>Done loading</source>
        <translation type="unfinished">Učitavanje gotovo</translation>
    </message>
    <message>
        <source>Dump file %s does not exist.</source>
        <translation type="unfinished">Dump datoteka %s ne postoji.</translation>
    </message>
    <message>
        <source>Error creating %s</source>
        <translation type="unfinished">Greška pri stvaranju %s</translation>
    </message>
    <message>
        <source>Error initializing block database</source>
        <translation type="unfinished">Greška kod inicijaliziranja baze blokova</translation>
    </message>
    <message>
        <source>Error initializing wallet database environment %s!</source>
        <translation type="unfinished">Greška kod inicijaliziranja okoline baze novčanika %s!</translation>
    </message>
    <message>
        <source>Error loading %s</source>
        <translation type="unfinished">Greška kod pokretanja programa %s!</translation>
    </message>
    <message>
        <source>Error loading %s: Private keys can only be disabled during creation</source>
        <translation type="unfinished">Greška kod učitavanja %s: Privatni ključevi mogu biti isključeni samo tijekom stvaranja</translation>
    </message>
    <message>
        <source>Error loading %s: Wallet corrupted</source>
        <translation type="unfinished">Greška kod učitavanja %s: Novčanik pokvaren</translation>
    </message>
    <message>
        <source>Error loading %s: Wallet requires newer version of %s</source>
        <translation type="unfinished">Greška kod učitavanja %s: Novčanik zahtijeva noviju verziju softvera %s.</translation>
    </message>
    <message>
        <source>Error loading block database</source>
        <translation type="unfinished">Greška kod pokretanja baze blokova</translation>
    </message>
    <message>
        <source>Error opening block database</source>
        <translation type="unfinished">Greška kod otvaranja baze blokova</translation>
    </message>
    <message>
        <source>Error reading from database, shutting down.</source>
        <translation type="unfinished">Greška kod iščitanja baze. Zatvara se klijent.</translation>
    </message>
    <message>
        <source>Error reading next record from wallet database</source>
        <translation type="unfinished">Greška pri očitavanju idućeg zapisa iz baza podataka novčanika</translation>
    </message>
    <message>
        <source>Error: Couldn't create cursor into database</source>
        <translation type="unfinished">Greška: Nije moguće kreirati cursor u batu podataka</translation>
    </message>
    <message>
        <source>Error: Disk space is low for %s</source>
        <translation type="unfinished">Pogreška: Malo diskovnog prostora za %s</translation>
    </message>
    <message>
        <source>Error: Dumpfile checksum does not match. Computed %s, expected %s</source>
        <translation type="unfinished">Greška: Dumpfile checksum se ne poklapa. Izračunao %s, očekivano %s</translation>
    </message>
    <message>
        <source>Error: Got key that was not hex: %s</source>
        <translation type="unfinished">Greška: Dobiven ključ koji nije hex: %s</translation>
    </message>
    <message>
        <source>Error: Got value that was not hex: %s</source>
        <translation type="unfinished">Greška: Dobivena vrijednost koja nije hex: %s</translation>
    </message>
    <message>
        <source>Error: Keypool ran out, please call keypoolrefill first</source>
        <translation type="unfinished">Greška: Ispraznio se bazen ključeva, molimo prvo pozovite keypoolrefill</translation>
    </message>
    <message>
        <source>Error: Missing checksum</source>
        <translation type="unfinished">Greška: Nedostaje checksum</translation>
    </message>
    <message>
        <source>Error: No %s addresses available.</source>
        <translation type="unfinished">Greška: Nema %s adresa raspoloživo.</translation>
    </message>
    <message>
        <source>Error: Unable to parse version %u as a uint32_t</source>
        <translation type="unfinished">Greška: Nije moguće parsirati verziju %u kao uint32_t</translation>
    </message>
    <message>
        <source>Error: Unable to write record to new wallet</source>
        <translation type="unfinished">Greška: Nije moguće unijeti zapis u novi novčanik</translation>
    </message>
    <message>
        <source>Failed to listen on any port. Use -listen=0 if you want this.</source>
        <translation type="unfinished">Neuspješno slušanje na svim portovima. Koristite -listen=0 ako to želite.</translation>
    </message>
    <message>
        <source>Failed to rescan the wallet during initialization</source>
        <translation type="unfinished">Neuspješno ponovo skeniranje novčanika tijekom inicijalizacije</translation>
    </message>
    <message>
        <source>Failed to verify database</source>
        <translation type="unfinished">Verifikacija baze podataka neuspješna</translation>
    </message>
    <message>
        <source>Fee rate (%s) is lower than the minimum fee rate setting (%s)</source>
        <translation type="unfinished">Naknada (%s) je niža od postavke minimalne visine naknade (%s)</translation>
    </message>
    <message>
        <source>Ignoring duplicate -wallet %s.</source>
        <translation type="unfinished">Zanemarujem duplicirani -wallet %s.</translation>
    </message>
    <message>
        <source>Importing…</source>
        <translation type="unfinished">Uvozim...</translation>
    </message>
    <message>
        <source>Incorrect or no genesis block found. Wrong datadir for network?</source>
        <translation type="unfinished">Neispravan ili nepostojeći blok geneze. Možda je kriva podatkovna mapa za mrežu?</translation>
    </message>
    <message>
        <source>Initialization sanity check failed. %s is shutting down.</source>
        <translation type="unfinished">Brzinska provjera inicijalizacije neuspješna. %s se zatvara.</translation>
    </message>
    <message>
        <source>Input not found or already spent</source>
        <translation type="unfinished">Input nije pronađen ili je već potrošen</translation>
    </message>
    <message>
        <source>Insufficient funds</source>
        <translation type="unfinished">Nedovoljna sredstva</translation>
    </message>
    <message>
        <source>Invalid -i2psam address or hostname: '%s'</source>
        <translation type="unfinished">Neispravna -i2psam adresa ili ime računala: '%s'</translation>
    </message>
    <message>
        <source>Invalid -onion address or hostname: '%s'</source>
        <translation type="unfinished">Neispravna -onion adresa ili ime računala: '%s'</translation>
    </message>
    <message>
        <source>Invalid -proxy address or hostname: '%s'</source>
        <translation type="unfinished">Neispravna -proxy adresa ili ime računala: '%s'</translation>
    </message>
    <message>
        <source>Invalid P2P permission: '%s'</source>
        <translation type="unfinished">Nevaljana dozvola za P2P: '%s'</translation>
    </message>
    <message>
        <source>Invalid amount for -%s=&lt;amount&gt;: '%s'</source>
        <translation type="unfinished">Neispravan iznos za  -%s=&lt;amount&gt;: '%s'</translation>
    </message>
    <message>
        <source>Invalid netmask specified in -whitelist: '%s'</source>
        <translation type="unfinished">Neispravna mrežna maska zadana u -whitelist: '%s'</translation>
    </message>
    <message>
        <source>Loading P2P addresses…</source>
        <translation type="unfinished">Pokreće se popis P2P adresa...</translation>
    </message>
    <message>
        <source>Loading banlist…</source>
        <translation type="unfinished">Pokreće se popis zabrana...</translation>
    </message>
    <message>
        <source>Loading block index…</source>
        <translation type="unfinished">Učitavanje indeksa blokova...</translation>
    </message>
    <message>
        <source>Loading wallet…</source>
        <translation type="unfinished">Učitavanje novčanika...</translation>
    </message>
    <message>
        <source>Missing amount</source>
        <translation type="unfinished">Iznos nedostaje</translation>
    </message>
    <message>
        <source>Missing solving data for estimating transaction size</source>
        <translation type="unfinished">Nedostaju podaci za procjenu veličine transakcije</translation>
    </message>
    <message>
        <source>Need to specify a port with -whitebind: '%s'</source>
        <translation type="unfinished">Treba zadati port pomoću -whitebind: '%s'</translation>
    </message>
    <message>
        <source>No addresses available</source>
        <translation type="unfinished">Nema dostupnih adresa</translation>
    </message>
    <message>
        <source>Not enough file descriptors available.</source>
        <translation type="unfinished">Nema dovoljno dostupnih datotečnih opisivača.</translation>
    </message>
    <message>
        <source>Prune cannot be configured with a negative value.</source>
        <translation type="unfinished">Obrezivanje (prune) ne može biti postavljeno na negativnu vrijednost.</translation>
    </message>
    <message>
        <source>Prune mode is incompatible with -txindex.</source>
        <translation type="unfinished">Način obreživanja (pruning) nekompatibilan je s parametrom -txindex.</translation>
    </message>
    <message>
        <source>Pruning blockstore…</source>
        <translation type="unfinished">Pruning blockstore-a...</translation>
    </message>
    <message>
        <source>Reducing -maxconnections from %d to %d, because of system limitations.</source>
        <translation type="unfinished">Smanjuje se -maxconnections sa %d na %d zbog sustavnih ograničenja.</translation>
    </message>
    <message>
        <source>Replaying blocks…</source>
        <translation type="unfinished">Premotavam blokove...</translation>
    </message>
    <message>
        <source>Rescanning…</source>
        <translation type="unfinished">Ponovno pretraživanje...</translation>
    </message>
    <message>
        <source>SQLiteDatabase: Failed to execute statement to verify database: %s</source>
        <translation type="unfinished">SQLiteDatabase: Neuspješno izvršenje izjave za verifikaciju baze podataka: %s</translation>
    </message>
    <message>
        <source>SQLiteDatabase: Failed to prepare statement to verify database: %s</source>
        <translation type="unfinished">SQLiteDatabase: Neuspješno pripremanje izjave za verifikaciju baze: %s</translation>
    </message>
    <message>
        <source>SQLiteDatabase: Failed to read database verification error: %s</source>
        <translation type="unfinished">SQLiteDatabase: Neuspješno čitanje greške verifikacije baze podataka %s</translation>
    </message>
    <message>
        <source>SQLiteDatabase: Unexpected application id. Expected %u, got %u</source>
        <translation type="unfinished">SQLiteDatabase: Neočekivani id aplikacije. Očekvano %u, pronađeno %u</translation>
    </message>
    <message>
        <source>Section [%s] is not recognized.</source>
        <translation type="unfinished">Odjeljak [%s] nije prepoznat.</translation>
    </message>
    <message>
        <source>Signing transaction failed</source>
        <translation type="unfinished">Potpisivanje transakcije neuspješno</translation>
    </message>
    <message>
        <source>Specified -walletdir "%s" does not exist</source>
        <translation type="unfinished">Zadan -walletdir "%s" ne postoji</translation>
    </message>
    <message>
        <source>Specified -walletdir "%s" is a relative path</source>
        <translation type="unfinished">Zadan -walletdir "%s" je relativan put</translation>
    </message>
    <message>
        <source>Specified -walletdir "%s" is not a directory</source>
        <translation type="unfinished">Zadan -walletdir "%s" nije mapa</translation>
    </message>
    <message>
        <source>Specified blocks directory "%s" does not exist.</source>
        <translation type="unfinished">Zadana mapa blokova "%s" ne postoji.</translation>
    </message>
    <message>
        <source>Starting network threads…</source>
        <translation type="unfinished">Pokreću se mrežne niti...</translation>
    </message>
    <message>
        <source>The source code is available from %s.</source>
        <translation type="unfinished">Izvorni kod je dostupan na %s.</translation>
    </message>
    <message>
        <source>The specified config file %s does not exist</source>
        <translation type="unfinished">Navedena konfiguracijska datoteka %s ne postoji</translation>
    </message>
    <message>
        <source>The transaction amount is too small to pay the fee</source>
        <translation type="unfinished">Transakcijiski iznos je premalen da plati naknadu</translation>
    </message>
    <message>
        <source>The wallet will avoid paying less than the minimum relay fee.</source>
        <translation type="unfinished">Ovaj novčanik će izbjegavati plaćanje manje od minimalne naknade prijenosa.</translation>
    </message>
    <message>
        <source>This is experimental software.</source>
        <translation type="unfinished">Ovo je eksperimentalni softver.</translation>
    </message>
    <message>
        <source>This is the minimum transaction fee you pay on every transaction.</source>
        <translation type="unfinished">Ovo je minimalna transakcijska naknada koju plaćate za svaku transakciju.</translation>
    </message>
    <message>
        <source>This is the transaction fee you will pay if you send a transaction.</source>
        <translation type="unfinished">Ovo je transakcijska naknada koju ćete platiti ako pošaljete transakciju.</translation>
    </message>
    <message>
        <source>Transaction amount too small</source>
        <translation type="unfinished">Transakcijski iznos premalen</translation>
    </message>
    <message>
        <source>Transaction amounts must not be negative</source>
        <translation type="unfinished">Iznosi transakcije ne smiju biti negativni</translation>
    </message>
    <message>
        <source>Transaction change output index out of range</source>
        <translation type="unfinished">Indeks change outputa transakcije je izvan dometa</translation>
    </message>
    <message>
        <source>Transaction has too long of a mempool chain</source>
        <translation type="unfinished">Transakcija ima prevelik lanac memorijskog bazena</translation>
    </message>
    <message>
        <source>Transaction must have at least one recipient</source>
        <translation type="unfinished">Transakcija mora imati barem jednog primatelja</translation>
    </message>
    <message>
        <source>Transaction needs a change address, but we can't generate it.</source>
        <translation type="unfinished">Transakciji je potrebna change adresa, ali ju ne možemo generirati.</translation>
    </message>
    <message>
        <source>Transaction too large</source>
        <translation type="unfinished">Transakcija prevelika</translation>
    </message>
    <message>
        <source>Unable to bind to %s on this computer (bind returned error %s)</source>
        <translation type="unfinished">Ne može se povezati na %s na ovom računalu. (povezivanje je vratilo grešku %s)</translation>
    </message>
    <message>
        <source>Unable to bind to %s on this computer. %s is probably already running.</source>
        <translation type="unfinished">Ne može se povezati na %s na ovom računalu.  %s je vjerojatno već pokrenut.</translation>
    </message>
    <message>
        <source>Unable to create the PID file '%s': %s</source>
        <translation type="unfinished">Nije moguće stvoriti PID datoteku '%s': %s</translation>
    </message>
    <message>
        <source>Unable to generate initial keys</source>
        <translation type="unfinished">Ne mogu se generirati početni ključevi</translation>
    </message>
    <message>
        <source>Unable to generate keys</source>
        <translation type="unfinished">Ne mogu se generirati ključevi</translation>
    </message>
    <message>
        <source>Unable to open %s for writing</source>
        <translation type="unfinished">Ne mogu otvoriti %s za upisivanje</translation>
    </message>
    <message>
        <source>Unable to parse -maxuploadtarget: '%s'</source>
        <translation type="unfinished">Nije moguće parsirati -maxuploadtarget: '%s'</translation>
    </message>
    <message>
        <source>Unable to start HTTP server. See debug log for details.</source>
        <translation type="unfinished">Ne može se pokrenuti HTTP server. Vidite debug.log za više detalja.</translation>
    </message>
    <message>
        <source>Unknown -blockfilterindex value %s.</source>
        <translation type="unfinished">Nepoznata vrijednost parametra -blockfilterindex %s.</translation>
    </message>
    <message>
        <source>Unknown address type '%s'</source>
        <translation type="unfinished">Nepoznat tip adrese '%s'</translation>
    </message>
    <message>
        <source>Unknown change type '%s'</source>
        <translation type="unfinished">Nepoznat tip adrese za vraćanje ostatka '%s'</translation>
    </message>
    <message>
        <source>Unknown network specified in -onlynet: '%s'</source>
        <translation type="unfinished">Nepoznata mreža zadana kod -onlynet: '%s'</translation>
    </message>
    <message>
        <source>Unknown new rules activated (versionbit %i)</source>
        <translation type="unfinished"> Nepoznata nova pravila aktivirana (versionbit %i)</translation>
    </message>
    <message>
        <source>Unsupported logging category %s=%s.</source>
        <translation type="unfinished">Nepodržana kategorija zapisa %s=%s.</translation>
    </message>
    <message>
        <source>User Agent comment (%s) contains unsafe characters.</source>
        <translation type="unfinished">Komentar pod "Korisnički agent" (%s) sadrži nesigurne znakove.</translation>
    </message>
    <message>
        <source>Verifying blocks…</source>
        <translation type="unfinished">Provjervanje blokova...</translation>
    </message>
    <message>
        <source>Verifying wallet(s)…</source>
        <translation type="unfinished">Provjeravanje novčanika...</translation>
    </message>
    <message>
        <source>Wallet needed to be rewritten: restart %s to complete</source>
        <translation type="unfinished">Novčanik je trebao prepravak: ponovo pokrenite %s</translation>
    </message>
    <message>
        <source>Settings file could not be read</source>
        <translation type="unfinished">Datoteka postavke se ne može pročitati</translation>
    </message>
    <message>
        <source>Settings file could not be written</source>
        <translation type="unfinished">Datoteka postavke se ne može mijenjati</translation>
    </message>
</context>
</TS>`, `<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
	<name>interviews</name>
	<comment></comment>
	<projects>
	</projects>
	<buildSpec>
	</buildSpec>
	<natures>
	</natures>
</projectDescription>`, `
<book id="media_api" lang="en">
<bookinfo>
	<title>LINUX MEDIA INFRASTRUCTURE API</title>

	<copyright>
		<year>2009-2015</year>
		<holder>LinuxTV Developers</holder>
	</copyright>

	<legalnotice>
		<para>Permission is granted to copy, distribute and/or modify
		this document under the terms of the GNU Free Documentation License,
		Version 1.1 or any later version published by the Free Software
		Foundation. A copy of the license is included in the chapter entitled
		"GNU Free Documentation License"</para>
	</legalnotice>
</bookinfo>
</book>`, `
<book id="media_api" lang="en">
<bookinfo>
	<title>LINUX MEDIA INFRASTRUCTURE API</title>

	<copyright>
		<year>2009-2015</year>
		<holder>LinuxTV Developers</holder>
	</copyright>

	<legalnotice>
		<para>Permission is granted to copy, distribute and/or modify
		this document under the terms of the GNU Free Documentation License,
		Version 1.1 or any later version published by the Free Software
		Foundation. A copy of the license is included in the chapter entitled
		"GNU Free Documentation License"</para>
	</legalnotice>
</bookinfo>
</book`, `<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <Configuration Condition=" '$(Configuration)' == '' ">Debug</Configuration>
    <Platform Condition=" '$(Platform)' == '' ">x86</Platform>
    <ProductVersion>3.5</ProductVersion>
    <ProjectGuid>{1d808ff0-b5a9-4be9-859d-b334b6f48be2}</ProjectGuid>
    <SchemaVersion>2.0</SchemaVersion>
    <OutputName>node-v$(FullVersion)-$(Platform)</OutputName>
    <OutputType>Package</OutputType>
    <EnableProjectHarvesting>True</EnableProjectHarvesting>
    <WixTargetsPath Condition=" '$(WixTargetsPath)' == '' AND '$(MSBuildExtensionsPath32)' != '' ">$(MSBuildExtensionsPath32)\Microsoft\WiX\v3.x\Wix.targets</WixTargetsPath>
    <WixTargetsPath Condition=" '$(WixTargetsPath)' == '' ">$(MSBuildExtensionsPath)\Microsoft\WiX\v3.x\Wix.targets</WixTargetsPath>
    <NodeVersion Condition=" '$(NodeVersion)' == '' ">0.0.0.0</NodeVersion>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|x86' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFilesFolder</DefineConstants>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|x86' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFilesFolder</DefineConstants>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|x64' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFiles64Folder</DefineConstants>
    <Cultures>en-US</Cultures>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|x64' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFiles64Folder</DefineConstants>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Debug|arm64' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFiles64Folder</DefineConstants>
  </PropertyGroup>
  <PropertyGroup Condition=" '$(Configuration)|$(Platform)' == 'Release|arm64' ">
    <OutputPath>..\..\..\</OutputPath>
    <IntermediateOutputPath>obj\$(Configuration)\</IntermediateOutputPath>
    <DefineConstants>Debug;ProductVersion=$(NodeVersion);FullVersion=$(FullVersion);DistTypeDir=$(DistTypeDir);NoETW=$(NoETW);NpmSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm\;CorepackSourceDir=..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack\;ProgramFilesFolderId=ProgramFiles64Folder</DefineConstants>
  </PropertyGroup>
  <PropertyGroup>
    <EnableProjectHarvesting>True</EnableProjectHarvesting>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="product.wxs" />
    <Compile Include="..\..\..\npm.wxs">
      <Link>npm.wxs</Link>
    </Compile>
    <Compile Include="..\..\..\corepack.wxs">
      <Link>corepack.wxs</Link>
    </Compile>
  </ItemGroup>
  <ItemGroup>
    <WixExtension Include="WixUIExtension">
      <HintPath>$(WixExtDir)\WixUIExtension.dll</HintPath>
      <Name>WixUIExtension</Name>
    </WixExtension>
    <WixExtension Include="WiXUtilExtension">
      <HintPath>$(WixExtDir)\WiXUtilExtension.dll</HintPath>
      <Name>WiXUtilExtension</Name>
    </WixExtension>
  </ItemGroup>
  <ItemGroup>
    <EmbeddedResource Include="i18n\en-us.wxl" />
  </ItemGroup>
  <ItemGroup>
    <ProjectReference Include="custom_actions.vcxproj">
      <Name>custom_actions</Name>
      <Project>{b70585f8-dab7-40fa-9904-13cf53a73a06}</Project>
      <Private>True</Private>
      <DoNotHarvest>True</DoNotHarvest>
      <RefProjectOutputGroups>Binaries;Content;Satellites</RefProjectOutputGroups>
      <RefTargetDir>INSTALLFOLDER</RefTargetDir>
    </ProjectReference>
  </ItemGroup>
  <Import Project="$(WixTargetsPath)" />
  <Target Name="BeforeBuild">
    <HeatDirectory ToolPath="$(WixToolPath)" Directory="..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\npm" PreprocessorVariable="var.NpmSourceDir" DirectoryRefId="NodeModulesFolder" ComponentGroupName="NpmSourceFiles" GenerateGuidsNow="true" SuppressFragments="false" OutputFile="..\..\..\npm.wxs" RunAsSeparateProcess="true">
    </HeatDirectory>
    <HeatDirectory ToolPath="$(WixToolPath)" Directory="..\..\..\Release\node-v$(FullVersion)-win-$(Platform)\node_modules\corepack" PreprocessorVariable="var.CorepackSourceDir" DirectoryRefId="NodeModulesFolder" ComponentGroupName="CorepackSourceFiles" GenerateGuidsNow="true" SuppressFragments="false" OutputFile="..\..\..\corepack.wxs" RunAsSeparateProcess="true">
    </HeatDirectory>
  </Target>
  <PropertyGroup>
    <PostBuildEvent>move "!(TargetPath)" "$(TargetDir)\$(TargetFileName)"
    move "!(TargetPdbPath)" "$(TargetDir)\$(TargetPdbName)"</PostBuildEvent>
  </PropertyGroup>
</Project>`]